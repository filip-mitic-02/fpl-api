import { inject, injectable } from 'tsyringe';
import { FantasyTeamRepository, PlayerRepository } from '../repositories';
import {
  BadRequestException,
  ConflictException,
  CreateFantasyTeamRequest,
  MAX_BUDGET,
  MAX_FROM_SAME_CLUB,
  NotFoundException,
  NUMBER_OF_DEFENDERS,
  NUMBER_OF_FORWARDS,
  NUMBER_OF_GOALKEEPERS,
  NUMBER_OF_MIDFIELDERS,
  Position,
  TEAM_SIZE,
  TransferRequest,
  validateUuid,
} from '../shared';
import { FantasyTeamModel, FantasyTeamWithPlayersModel } from '../models';

@injectable()
export class FantasyTeamService {
  constructor(
    @inject(FantasyTeamRepository)
    private readonly fantasyTeamRepository: FantasyTeamRepository,
    @inject(PlayerRepository)
    private readonly playersRepository: PlayerRepository,
  ) {}

  async createFantasyTeam(userId: string, teamData: CreateFantasyTeamRequest): Promise<FantasyTeamModel> {
    const { name, players, captainId } = teamData;

    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== TEAM_SIZE) {
      throw new BadRequestException('You can not have duplicate players in your team.');
    }

    const doesUserHaveTeam = await this.fantasyTeamRepository.hasFantasyTeam(userId);
    if (doesUserHaveTeam) {
      throw new ConflictException('User already made his team.');
    }

    const [foundPlayers, positionCounts] = await Promise.all([
      this.playersRepository.findByIds(players),
      this.playersRepository.countByPosition(players),
    ]);
    if (foundPlayers.length !== TEAM_SIZE) {
      throw new BadRequestException('One or more players have invalid playerId.');
    }

    const goalkeepers = positionCounts.find((p) => p.position === Position.GOALKEEPER)?.count ?? 0;
    const defenders = positionCounts.find((p) => p.position === Position.DEFENDER)?.count ?? 0;
    const midfielders = positionCounts.find((p) => p.position === Position.MIDFIELDER)?.count ?? 0;
    const forwards = positionCounts.find((p) => p.position === Position.FORWARD)?.count ?? 0;
    if (
      goalkeepers !== NUMBER_OF_GOALKEEPERS ||
      defenders !== NUMBER_OF_DEFENDERS ||
      midfielders !== NUMBER_OF_MIDFIELDERS ||
      forwards !== NUMBER_OF_FORWARDS
    ) {
      throw new BadRequestException('You must pick 2 Goalkeepers, 5 Defenders, 5 Midfielders and 3 Forwards.');
    }

    const totalValue = foundPlayers.reduce((sum, player) => sum + player.value, 0);
    if (totalValue > MAX_BUDGET) {
      throw new BadRequestException('You can not spend more than 100m.');
    }

    for (const player of foundPlayers) {
      const playersFromSameClub = foundPlayers.filter((p) => p.clubId === player.clubId).length;
      if (playersFromSameClub > MAX_FROM_SAME_CLUB) {
        throw new BadRequestException('You can not have more than 3 players from the same club.');
      }
    }

    if (!players.includes(captainId)) {
      throw new BadRequestException('Captain must be one of the 15 selected players.');
    }

    const bench: string[] = [];
    bench.push(foundPlayers.filter((p) => p.position === Position.GOALKEEPER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.DEFENDER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.MIDFIELDER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.FORWARD)[0].id);

    const teamPlayers = players.map((playerId) => ({
      playerId,
      isCaptain: playerId === captainId,
      onBench: bench.includes(playerId),
    }));

    return await this.fantasyTeamRepository.createFantasyTeam(userId, name, teamPlayers);
  }

  async getMyTeam(userId: string): Promise<FantasyTeamWithPlayersModel> {
    const team = await this.fantasyTeamRepository.getMyTeam(userId);
    if (!team) {
      throw new NotFoundException('Fantasy team not found.');
    }

    return team;
  }

  async getTeamById(id: string): Promise<FantasyTeamWithPlayersModel> {
    validateUuid(id);
    const team = await this.fantasyTeamRepository.getTeamById(id);
    if (!team) {
      throw new NotFoundException('Fantasy team not found.');
    }
    return team;
  }

  async transferPlayer(teamId: string, transferData: TransferRequest): Promise<FantasyTeamWithPlayersModel> {
    validateUuid(teamId);
    const { playerOutId, playerInId } = transferData;
    const team = await this.fantasyTeamRepository.getTeamById(teamId);
    if (!team) {
      throw new NotFoundException('Fantasy team not found.');
    }

    const playerOut = team.players.find((p) => p.id === playerOutId);
    if (!playerOut) {
      throw new BadRequestException('Player you are trying to transfer out is not in your team.');
    }

    const playerIn = await this.playersRepository.findById(playerInId);
    if (!playerIn) {
      throw new NotFoundException('Player you are trying to transfer in does not exist.');
    }

    const isAlreadyInTeam = team.players.some((p) => p.id === playerInId);
    if (isAlreadyInTeam) {
      throw new BadRequestException('This player is already in your team.');
    }

    if (team.transfersRemaining === 0) {
      throw new BadRequestException('You do not have any transfers remaining.');
    }

    if (playerOut.position !== playerIn.position) {
      throw new BadRequestException('Players must be of the same position.');
    }

    const currentValue = team.players.reduce((sum, p) => sum + p.value, 0);
    const newValue = currentValue - playerOut.value + playerIn.value;
    if (newValue > MAX_BUDGET) {
      throw new BadRequestException('You do not have enough budget for this transfer.');
    }

    const playersFromSameClub = team.players.filter((p) => p.clubId === playerIn.clubId && p.id !== playerOutId).length;
    if (playersFromSameClub >= MAX_FROM_SAME_CLUB) {
      throw new BadRequestException('You can not have more than 3 players from the same club.');
    }

    await this.fantasyTeamRepository.transferPlayer(teamId, playerOutId, playerInId);

    return await this.getTeamById(teamId);
  }
}
