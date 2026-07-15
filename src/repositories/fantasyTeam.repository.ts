import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { FantasyTeam } from '../entities';
import { ChipModel, FantasyTeamChipModel, FantasyTeamModel, FantasyTeamPlayerData, FantasyTeamWithPlayersModel } from '../models';
import { ChipType, FantasyTeamRow } from '../shared';

@injectable()
export class FantasyTeamRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async hasFantasyTeam(userId: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE "userId" = $1`, [userId]);

    return count > 0;
  }

  async createFantasyTeam(
    userId: string,
    name: string,
    teamPlayers: FantasyTeamPlayerData[],
    chips: ChipModel[],
  ): Promise<FantasyTeamModel> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [fantasyTeam] = await queryRunner.query(
        `INSERT INTO ${this.tableName} ("userId", name, value, points, "transfersRemaining") 
             VALUES ($1, $2, 100, 0, 0) 
             RETURNING id, "userId", name, value::float, points, "transfersRemaining", "createdAt", "updatedAt"`,
        [userId, name],
      );

      for (const player of teamPlayers) {
        await queryRunner.query(
          `INSERT INTO "fantasyTeamsPlayers" ("fantasyTeamId", "playerId", "isCaptain", "onBench") 
              VALUES ($1, $2, $3, $4)`,
          [fantasyTeam.id, player.playerId, player.isCaptain, player.onBench],
        );
      }

      for (const chip of chips) {
        await queryRunner.query(
          `INSERT INTO "fantasyTeamsChips" ("fantasyTeamId", "chipId", "isUsed")
              VALUES ($1, $2, $3)`,
          [fantasyTeam.id, chip.id, false],
        );
      }

      await queryRunner.commitTransaction();
      return fantasyTeam;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyTeam(userId: string): Promise<FantasyTeamWithPlayersModel | null> {
    const result = await this.dataSource.query(
      `SELECT ft.id, ft."userId", ft.name, ft.value::float, ft.points, ft."transfersRemaining", ft."createdAt", ft."updatedAt",
                p.id as "playerId", p."clubId", p.name as "playerName", p.surname, p.value::float as "playerValue", p.position,
                ftp."isCaptain", ftp."onBench"
         FROM "fantasyTeams" ft
         LEFT JOIN "fantasyTeamsPlayers" ftp ON ft.id = ftp."fantasyTeamId"
         LEFT JOIN players p ON ftp."playerId" = p.id
         WHERE ft."userId" = $1`,
      [userId],
    );

    if (!result.length) return null;
    return this.mapToFantasyTeamWithPlayers(result);
  }

  async getTeamById(id: string): Promise<FantasyTeamWithPlayersModel | null> {
    const result = await this.dataSource.query(
      `SELECT ft.id, ft."userId", ft.name, ft.value::float, ft.points, ft."transfersRemaining", ft."createdAt", ft."updatedAt",
                p.id as "playerId", p."clubId", p.name as "playerName", p.surname, p.value::float as "playerValue", p.position,
                ftp."isCaptain", ftp."onBench"
         FROM "fantasyTeams" ft
         LEFT JOIN "fantasyTeamsPlayers" ftp ON ft.id = ftp."fantasyTeamId"
         LEFT JOIN players p ON ftp."playerId" = p.id
         WHERE ft.id = $1`,
      [id],
    );

    if (!result.length) return null;
    return this.mapToFantasyTeamWithPlayers(result);
  }

  async transferPlayer(teamId: string, playerOutId: string, playerInId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`UPDATE "fantasyTeamsPlayers" SET "playerId" = $1 WHERE "fantasyTeamId" = $2 AND "playerId" = $3`, [
        playerInId,
        teamId,
        playerOutId,
      ]);

      await queryRunner.query(`UPDATE "fantasyTeams" SET "transfersRemaining" = "transfersRemaining" - 1 WHERE id = $1`, [teamId]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async existsById(id: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE id = $1`, [id]);

    return count > 0;
  }

  async isChipUsed(fantasyTeamId: string, chipId: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM "fantasyTeamsChips" WHERE "fantasyTeamId" = $1 AND "chipId" = $2 AND "isUsed" = true`,
      [fantasyTeamId, chipId],
    );

    return count > 0;
  }

  async activateChip(fantasyTeamId: string, chipId: string, gameweekId: string): Promise<FantasyTeamChipModel> {
    await this.dataSource.query(
      `UPDATE "fantasyTeamsChips" SET "isUsed" = true, "gameweekId" = $1 
         WHERE "fantasyTeamId" = $2 AND "chipId" = $3`,
      [gameweekId, fantasyTeamId, chipId],
    );

    const result = await this.dataSource.query(
      `SELECT ftc."fantasyTeamId", ft.name as "fantasyTeamName", ftc."chipId", c.type as "chipType"
         FROM "fantasyTeamsChips" ftc
         JOIN "fantasyTeams" ft ON ft.id = ftc."fantasyTeamId"
         JOIN chips c ON c.id = ftc."chipId"
         WHERE ftc."fantasyTeamId" = $1 AND ftc."chipId" = $2`,
      [fantasyTeamId, chipId],
    );

    return result[0];
  }

  async isChipUsedForGameweek(fantasyTeamId: string, gameweekId: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM "fantasyTeamsChips" 
         WHERE "fantasyTeamId" = $1 AND "gameweekId" = $2 AND "isUsed" = true`,
      [fantasyTeamId, gameweekId],
    );

    return count > 0;
  }

  async getActiveChipForGameweek(fantasyTeamId: string, gameweekId: string): Promise<ChipType | null> {
    const result = await this.dataSource.query(
      `SELECT c.type FROM "fantasyTeamsChips" ftc
         JOIN chips c ON c.id = ftc."chipId"
         WHERE ftc."fantasyTeamId" = $1 AND ftc."gameweekId" = $2 AND ftc."isUsed" = true`,
      [fantasyTeamId, gameweekId],
    );

    return result[0]?.type ?? null;
  }

  async useWildcard(fantasyTeamId: string, teamPlayers: FantasyTeamPlayerData[]): Promise<FantasyTeamModel> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`DELETE FROM "fantasyTeamsPlayers" WHERE "fantasyTeamId" = $1`, [fantasyTeamId]);

      for (const player of teamPlayers) {
        await queryRunner.query(
          `INSERT INTO "fantasyTeamsPlayers" ("fantasyTeamId", "playerId", "isCaptain", "onBench") VALUES ($1, $2, $3, $4)`,
          [fantasyTeamId, player.playerId, player.isCaptain, player.onBench],
        );
      }

      await queryRunner.query(`UPDATE ${this.tableName} SET "updatedAt" = NOW() WHERE id = $1`, [fantasyTeamId]);

      const [fantasyTeam] = await queryRunner.query(
        `SELECT id, "userId", name, value::float, points, "transfersRemaining", "createdAt", "updatedAt" FROM ${this.tableName} WHERE id = $1`,
        [fantasyTeamId],
      );

      await queryRunner.commitTransaction();
      return fantasyTeam;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private mapToFantasyTeamWithPlayers(rows: FantasyTeamRow[]): FantasyTeamWithPlayersModel {
    const first = rows[0];
    return {
      id: first.id,
      userId: first.userId,
      name: first.name,
      value: first.value,
      points: first.points,
      transfersRemaining: first.transfersRemaining,
      createdAt: first.createdAt,
      updatedAt: first.updatedAt,
      players: rows.map((row) => ({
        id: row.playerId,
        clubId: row.clubId,
        name: row.playerName,
        surname: row.surname,
        value: Number(row.playerValue),
        position: row.position,
        isCaptain: row.isCaptain,
        onBench: row.onBench,
      })),
    };
  }

  private get tableName(): string {
    return `"${this.dataSource.getMetadata(FantasyTeam).tableName}"`;
  }
}
