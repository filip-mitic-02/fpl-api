import { inject, injectable } from 'tsyringe';
import { FantasyTeamRepository, PlayerRepository } from '../repositories';
import { BadRequestException, ConflictException, CreateFantasyTeamRequest, NotFoundException, Position, TransferRequest } from '../shared';
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
    const { name, players } = teamData;
    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== 15) {
      throw new BadRequestException('You can not have duplicate players in your team.');
    }

    const doesUserHaveTeam = await this.fantasyTeamRepository.hasFantasyTeam(userId);
    if (doesUserHaveTeam) {
      throw new ConflictException('User already made his team.');
    }

    const foundPlayers = await this.playersRepository.findByIds(players);
    if (foundPlayers.length !== 15) {
      throw new BadRequestException('One or more players have invalid playerId.');
    }

    const goalkeepers = foundPlayers.filter((p) => p.position === Position.GOALKEEPER);
    const defenders = foundPlayers.filter((p) => p.position === Position.DEFENDER);
    const midfielders = foundPlayers.filter((p) => p.position === Position.MIDFIELDER);
    const forwards = foundPlayers.filter((p) => p.position === Position.FORWARD);
    if (goalkeepers.length !== 2 || defenders.length !== 5 || midfielders.length !== 5 || forwards.length !== 3) {
      throw new BadRequestException('You must pick 2 Goalkeepers, 5 Defenders, 5 Midfielders and 3 Forwards.');
    }

    const totalValue = foundPlayers.reduce((sum, player) => sum + player.value, 0);
    if (totalValue > 100) {
      throw new BadRequestException('You can not spend more than 100m.');
    }

    for (const player of foundPlayers) {
      const playersFromSameClub = foundPlayers.filter((p) => p.clubId === player.clubId).length;
      if (playersFromSameClub > 3) {
        throw new BadRequestException('You can not have more than 3 players from the same club.');
      }
    }

    const bench: string[] = [];
    bench.push(foundPlayers.filter((p) => p.position === Position.GOALKEEPER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.DEFENDER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.MIDFIELDER)[0].id);
    bench.push(foundPlayers.filter((p) => p.position === Position.FORWARD)[0].id);

    const captain = foundPlayers.filter((p) => p.position === Position.GOALKEEPER && !bench.includes(p.id))[0].id;

    return await this.fantasyTeamRepository.createFantasyTeam(userId, name, players, bench, captain);
  }

  async getMyTeam(userId: string): Promise<FantasyTeamWithPlayersModel> {
    const team = await this.fantasyTeamRepository.getMyTeam(userId);
    if (!team) {
      throw new NotFoundException('Fantasy team not found.');
    }
    return team;
  }

  async getTeamById(id: string): Promise<FantasyTeamWithPlayersModel> {
    const team = await this.fantasyTeamRepository.getTeamById(id);
    if (!team) {
      throw new NotFoundException('Fantasy team not found.');
    }
    return team;
  }

  async transferPlayer(teamId: string, transferData: TransferRequest): Promise<FantasyTeamWithPlayersModel> {
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
    if (newValue > 100) {
      throw new BadRequestException('You do not have enough budget for this transfer.');
    }

    const playersFromSameClub = team.players.filter((p) => p.clubId === playerIn.clubId && p.id !== playerOutId).length;
    if (playersFromSameClub >= 3) {
      throw new BadRequestException('You can not have more than 3 players from the same club.');
    }

    await this.fantasyTeamRepository.transferPlayer(teamId, playerOutId, playerInId);

    return await this.getTeamById(teamId);
  }
}
