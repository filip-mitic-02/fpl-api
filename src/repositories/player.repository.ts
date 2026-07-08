import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { PlayerModel, PlayerPositionCount, PlayerValidationData } from '../models';
import { Player } from '../entities';
import { PlayerSearchQuery } from '../shared';

@injectable()
export class PlayerRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async createPlayer(playerInfo: Partial<PlayerModel>): Promise<PlayerModel> {
    const { clubId, name, surname, value, position } = playerInfo;
    const createdPlayer = await this.dataSource.query(
      `INSERT INTO ${this.tableName} ("clubId", name, surname, value, position) VALUES ($1, $2, $3, $4, $5) RETURNING id, "clubId", name, surname, value::float, position, "createdAt", "updatedAt", "deletedAt"`,
      [clubId, name, surname, value, position],
    );

    return createdPlayer[0];
  }

  async findPlayers(searchCriteria: PlayerSearchQuery): Promise<PlayerModel[]> {
    const { whereClause, values, index } = this.buildWhereClause(searchCriteria);
    const { limit, offset } = searchCriteria;

    values.push(limit, offset);

    return await this.dataSource.query(
      `SELECT id, "clubId", name, surname, value::float, position, "createdAt", "updatedAt", "deletedAt"
      FROM ${this.tableName}
      ${whereClause}
      LIMIT $${index} OFFSET $${index + 1}`,
      values,
    );
  }

  async countPlayersBySearch(searchCriteria: PlayerSearchQuery): Promise<number> {
    const { whereClause, values } = this.buildWhereClause(searchCriteria);

    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} ${whereClause}`, values);

    return count;
  }

  async findById(id: string): Promise<PlayerModel | null> {
    const targetPlayer = await this.dataSource.query(
      `SELECT id, "clubId", name, surname, value::float, position, "createdAt", "updatedAt", "deletedAt" FROM ${this.tableName} WHERE id = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    return targetPlayer[0] ?? null;
  }

  async existsById(id: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE id = $1 AND "deletedAt" IS NULL`, [
      id,
    ]);

    return count > 0;
  }

  async deleteById(playerId: string): Promise<void> {
    await this.dataSource.query(`UPDATE ${this.tableName} SET "deletedAt" = NOW() WHERE id = $1`, [playerId]);
  }

  async updateById(playerId: string, updateData: Partial<PlayerModel>): Promise<Partial<PlayerModel>> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    if (updateData.name !== undefined) {
      updates.push(`name = $${index++}`);
      values.push(updateData.name);
    }

    if (updateData.surname !== undefined) {
      updates.push(`surname = $${index++}`);
      values.push(updateData.surname);
    }

    if (updateData.value !== undefined) {
      updates.push(`value = $${index++}`);
      values.push(updateData.value);
    }

    if (updateData.position !== undefined) {
      updates.push(`position = $${index++}`);
      values.push(updateData.position);
    }

    if (updateData.clubId !== undefined) {
      updates.push(`"clubId" = $${index++}`);
      values.push(updateData.clubId);
    }

    values.push(playerId);

    const updatedPlayer = await this.dataSource.query(
      `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = $${index} RETURNING id, "clubId", name, surname, value::float, position, "createdAt", "updatedAt", "deletedAt"`,
      values,
    );

    return updatedPlayer[0];
  }

  async findByIds(players: string[]): Promise<PlayerValidationData[]> {
    return await this.dataSource.query(
      `SELECT id, "clubId", position, value::float FROM ${this.tableName} WHERE id = ANY($1) AND "deletedAt" IS NULL`,
      [players],
    );
  }

  async countByPosition(playerIds: string[]): Promise<PlayerPositionCount[]> {
    return await this.dataSource.query(
      `SELECT position, COUNT(*)::int as count 
         FROM ${this.tableName} 
         WHERE id = ANY($1) AND "deletedAt" IS NULL 
         GROUP BY position`,
      [playerIds],
    );
  }

  private buildWhereClause(searchCriteria: PlayerSearchQuery): { whereClause: string; values: unknown[]; index: number } {
    const { search, position, clubId, minValue, maxValue } = searchCriteria;
    const conditions: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    if (search) {
      conditions.push(`(name || ' ' || surname) ILIKE $${index++}`);
      values.push(`%${search}%`);
    }

    if (position) {
      conditions.push(`position = $${index++}`);
      values.push(position);
    }

    if (clubId) {
      conditions.push(`"clubId" = $${index++}`);
      values.push(clubId);
    }

    if (minValue) {
      conditions.push(`value >= $${index++}`);
      values.push(minValue);
    }

    if (maxValue) {
      conditions.push(`value <= $${index++}`);
      values.push(maxValue);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')} AND "deletedAt" IS NULL` : `WHERE "deletedAt" IS NULL`;

    return { whereClause, values, index };
  }

  private get tableName(): string {
    return this.dataSource.getMetadata(Player).tableName;
  }
}
