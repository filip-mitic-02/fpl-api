import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { Gameweek } from '../entities';
import { GameweekModel, GameweekPlayerModel } from '../models';
import { GameweekTeamRow } from '../shared';

@injectable()
export class GameweekRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE name = $1`, [name]);

    return count > 0;
  }

  async existsByStartDate(startDate: Date): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE "startDate" = $1`, [startDate]);

    return count > 0;
  }

  async createGameweek(name: string, startDate: Date): Promise<GameweekModel> {
    const result = await this.dataSource.query(
      `INSERT INTO ${this.tableName} (name, "startDate") VALUES ($1, $2) RETURNING id, name, "startDate", "createdAt", "updatedAt"`,
      [name, startDate],
    );

    return result[0];
  }

  async existsById(gameweekId: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE id = $1`, [gameweekId]);

    return count > 0;
  }

  async existsByGameweekPlayerIds(gameweekId: string, playerId: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM "gameweeksPlayers" WHERE "gameweekId" = $1 AND "playerId" = $2`,
      [gameweekId, playerId],
    );

    return count > 0;
  }

  async addPlayerStats(gameweekId: string, playerInfo: Partial<GameweekPlayerModel>, gwPoints: number): Promise<GameweekPlayerModel> {
    const { playerId, goals, assists, cleanSheet, yellowCard, redCard, numOfMissedPenalties } = playerInfo;

    const result = await this.dataSource.query(
      `INSERT INTO "gameweeksPlayers" ("gameweekId", "playerId", goals, assists, "cleanSheet", "yellowCard", "redCard", "numOfMissedPenalties", "gwPoints")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING "gameweekId", "playerId", goals, assists, "cleanSheet", "yellowCard", "redCard", "numOfMissedPenalties", "gwPoints"`,
      [gameweekId, playerId, goals, assists, cleanSheet, yellowCard, redCard, numOfMissedPenalties, gwPoints],
    );

    return result[0];
  }

  async getTeamByGameweek(fantasyTeamId: string, gameweekId: string): Promise<GameweekTeamRow[]> {
    return await this.dataSource.query(
      `SELECT ft.id, ft.name as "teamName",
                p.id as "playerId", p.name as "playerName", p.surname, p.position,
                ftp."onBench", ftp."isCaptain",
                COALESCE(gp."gwPoints", 0) as "gwPoints"
         FROM "fantasyTeams" ft
         LEFT JOIN "fantasyTeamsPlayers" ftp ON ft.id = ftp."fantasyTeamId"
         LEFT JOIN players p ON ftp."playerId" = p.id
         LEFT JOIN "gameweeksPlayers" gp ON gp."playerId" = p.id AND gp."gameweekId" = $2
         WHERE ft.id = $1`,
      [fantasyTeamId, gameweekId],
    );
  }

  private get tableName(): string {
    return this.dataSource.getMetadata(Gameweek).tableName;
  }
}
