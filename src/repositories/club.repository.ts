import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { Club } from '../entities';
import { ClubModel } from '../models';
import { CreateClubRequest } from '../shared';

@injectable()
export class ClubRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM ${this.tableName} WHERE name ILIKE $1 AND "deletedAt" IS NULL`,
      [name],
    );

    return count > 0;
  }

  async createClub(name: string, initials: string): Promise<ClubModel> {
    const createdClub = await this.dataSource.query(
      `INSERT INTO ${this.tableName} (name, initials) VALUES ($1, $2) RETURNING id, name, initials, "createdAt", "updatedAt", "deletedAt"`,
      [name, initials],
    );

    return createdClub[0];
  }

  async findClubs(limit: number, offset: number, search: string): Promise<ClubModel[]> {
    return await this.dataSource.query(
      `SELECT id, name, initials, "createdAt", "updatedAt", "deletedAt" FROM ${this.tableName} WHERE name ILIKE $1 AND "deletedAt" IS NULL LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset],
    );
  }

  async countClubsBySearch(search: string): Promise<number> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM ${this.tableName} WHERE name ILIKE $1 AND "deletedAt" IS NULL`,
      [`%${search}%`],
    );

    return count;
  }

  async findById(id: string): Promise<ClubModel | null> {
    const targetClub = await this.dataSource.query(
      `SELECT id, name, initials, "createdAt", "updatedAt", "deletedAt" FROM ${this.tableName} WHERE id = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    return targetClub[0] ?? null;
  }

  async deleteById(clubId: string): Promise<void> {
    await this.dataSource.query(`UPDATE ${this.tableName} SET "deletedAt" = NOW() WHERE id = $1`, [clubId]);
  }

  async updateById(clubId: string, updateData: Partial<CreateClubRequest>): Promise<ClubModel> {
    const updates: string[] = [];
    const values: string[] = [];
    let index = 1;

    if (updateData.name !== undefined) {
      updates.push(`name = $${index++}`);
      values.push(updateData.name);
    }
    if (updateData.initials !== undefined) {
      updates.push(`initials = $${index++}`);
      values.push(updateData.initials);
    }
    values.push(clubId);

    const updatedClub = await this.dataSource.query(
      `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = $${index} RETURNING id, name, initials, "createdAt", "updatedAt", "deletedAt"`,
      values,
    );

    return updatedClub[0];
  }

  private get tableName(): string {
    return this.dataSource.getMetadata(Club).tableName;
  }
}
