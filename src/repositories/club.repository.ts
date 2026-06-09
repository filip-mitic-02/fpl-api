import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { Club } from '../entities';
import { ClubModel } from '../models';

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

  async countClubs(search: string): Promise<number> {
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

  async updateById(clubId: string, name: string, initials: string): Promise<ClubModel> {
    const updatedClub = await this.dataSource.query(
      `UPDATE ${this.tableName} SET name = $1, initials = $2 WHERE id = $3 RETURNING id, name, initials, "createdAt", "updatedAt", "deletedAt"`,
      [name, initials, clubId],
    );

    return updatedClub[0];
  }

  private get tableName(): string {
    return this.dataSource.getMetadata(Club).tableName;
  }
}
