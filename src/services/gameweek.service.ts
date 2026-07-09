import { inject, injectable } from 'tsyringe';
import { FantasyTeamRepository, GameweekRepository, PlayerRepository } from '../repositories';
import {
  ConflictException,
  CreateGameweekPlayerRequest,
  CreateGameweekRequest,
  GameweekTeamRow,
  NotFoundException,
  Position,
  validateUuid,
} from '../shared';
import { FantasyTeamGameweekModel, GameweekModel, GameweekPlayerModel } from '../models';

@injectable()
export class GameweekService {
  constructor(
    @inject(GameweekRepository)
    private readonly gameweekRepository: GameweekRepository,
    @inject(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
    @inject(FantasyTeamRepository)
    private readonly fantasyTeamRepository: FantasyTeamRepository,
  ) {}

  async createGameweek(gameweekInfo: CreateGameweekRequest): Promise<GameweekModel> {
    const { name, startDate } = gameweekInfo;

    const doesNameExist = await this.gameweekRepository.existsByName(name);
    if (doesNameExist) {
      throw new ConflictException('Gameweek with this name already exists.');
    }

    const doesStartDateExist = await this.gameweekRepository.existsByStartDate(startDate);
    if (doesStartDateExist) {
      throw new ConflictException('Gameweek with this startDate already exists.');
    }

    return await this.gameweekRepository.createGameweek(name, startDate);
  }

  async addPlayerStats(gameweekId: string, playerInfo: CreateGameweekPlayerRequest): Promise<GameweekPlayerModel> {
    validateUuid(gameweekId);

    const doesGameweekExist = await this.gameweekRepository.existsById(gameweekId);
    if (!doesGameweekExist) {
      throw new NotFoundException('Gameweek with this gameweekId doesnt exist.');
    }

    const { playerId } = playerInfo;
    const playerPosition = await this.playerRepository.findPositionById(playerId);
    if (!playerPosition) {
      throw new NotFoundException('Player with this playerId doesnt exist.');
    }

    const doesGameweekPlayerExist = await this.gameweekRepository.existsByGameweekPlayerIds(gameweekId, playerId);
    if (doesGameweekPlayerExist) {
      throw new ConflictException('Player already exists in this gameweek.');
    }

    const gwPoints = this.calculatePoints(playerInfo, playerPosition);

    return await this.gameweekRepository.addPlayerStats(gameweekId, playerInfo, gwPoints);
  }

  async getTeamByGameweek(fantasyTeamId: string, gameweekId: string): Promise<FantasyTeamGameweekModel> {
    validateUuid(fantasyTeamId);
    validateUuid(gameweekId);

    const doesFantasyTeamExist = await this.fantasyTeamRepository.existsById(fantasyTeamId);
    if (!doesFantasyTeamExist) {
      throw new NotFoundException('Fantasy team doesnt exist.');
    }

    const doesGameweekExist = await this.gameweekRepository.existsById(gameweekId);
    if (!doesGameweekExist) {
      throw new NotFoundException('Gameweek doesnt exist.');
    }

    const rows = await this.gameweekRepository.getTeamByGameweek(fantasyTeamId, gameweekId);
    return this.mapToFantasyTeamGameweek(rows);
  }

  private calculatePoints(playerInfo: CreateGameweekPlayerRequest, position: Position): number {
    let points = 0;

    points += playerInfo.goals * 5;
    points += playerInfo.assists * 3;
    points -= playerInfo.yellowCard ? 1 : 0;
    points -= playerInfo.redCard ? 2 : 0;
    points -= playerInfo.numOfMissedPenalties * 2;

    if (playerInfo.cleanSheet && (position === Position.GOALKEEPER || position === Position.DEFENDER)) {
      points += 4;
    }

    return points;
  }

  private mapToFantasyTeamGameweek(rows: GameweekTeamRow[]): FantasyTeamGameweekModel {
    const totalPoints = rows
      .filter((row) => !row.onBench)
      .reduce((sum, row) => {
        const points = Number(row.gwPoints);
        return sum + (row.isCaptain ? points * 2 : points);
      }, 0);

    return {
      id: rows[0].id,
      name: rows[0].teamName,
      players: rows.map((row) => ({
        id: row.playerId,
        name: row.playerName,
        surname: row.surname,
        position: row.position,
        gwPoints: row.isCaptain ? Number(row.gwPoints) * 2 : Number(row.gwPoints),
      })),
      totalPoints,
    };
  }
}
