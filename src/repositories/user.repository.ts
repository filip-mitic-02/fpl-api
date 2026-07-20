import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { User } from '../entities';
import { UserPublicInfo } from '../models';
import { Role, RegisterUserRequest } from '../shared';

@injectable()
export class UserRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM ${this.tableName} WHERE email = $1 OR (username = $2 AND "deletedAt" IS NULL)`,
      [email, username],
    );

    return count > 0;
  }

  async createUser(userData: RegisterUserRequest): Promise<UserPublicInfo> {
    const { name, surname, email, username, password, dateOfBirth } = userData;
    const createdUser = await this.dataSource.query(
      `INSERT INTO ${this.tableName} (name, surname, email, username, password, "dateOfBirth") VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, name, surname, email, username, role, "dateOfBirth", "createdAt", "updatedAt", "deletedAt"`,
      [name, surname, email, username, password, dateOfBirth],
    );

    return createdUser[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.dataSource.query(`SELECT * FROM ${this.tableName} WHERE email = $1`, [email]);

    return user[0] ?? null;
  }

  async findById(userId: string): Promise<UserPublicInfo | null> {
    const user = await this.dataSource.query(
      `SELECT id, name, surname, email, username, role, "dateOfBirth", "createdAt", "updatedAt", "deletedAt"
      FROM ${this.tableName}
      WHERE id = $1 AND "deletedAt" IS NULL`,
      [userId],
    );

    return user[0] ?? null;
  }

  async findRoleById(userId: string): Promise<Role | null> {
    const [{ role } = {}] = await this.dataSource.query(`SELECT role FROM ${this.tableName} WHERE id = $1 AND "deletedAt" IS NULL`, [
      userId,
    ]);

    return role ?? null;
  }

  async deleteById(userId: string): Promise<void> {
    await this.dataSource.query(`UPDATE ${this.tableName} SET "deletedAt" = NOW() WHERE id = $1`, [userId]);
  }

  async countAdmins(): Promise<number> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM ${this.tableName} WHERE role = 'ADMIN' AND "deletedAt" IS NULL`,
    );

    return count;
  }

  async findUsers(limit: number, offset: number, search: string): Promise<UserPublicInfo[]> {
    return await this.dataSource.query(
      `SELECT id, name, surname, email, username, role, "dateOfBirth", "createdAt", "updatedAt", "deletedAt"
      FROM ${this.tableName}
      WHERE username LIKE $1 AND "deletedAt" IS NULL
      LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset],
    );
  }

  async countUsersBySearch(search: string): Promise<number> {
    const [{ count }] = await this.dataSource.query(
      `SELECT COUNT(*)::int FROM ${this.tableName} WHERE username LIKE $1 AND "deletedAt" IS NULL`,
      [`%${search}%`],
    );

    return count;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const result = await this.dataSource.query(
        `SELECT * FROM ${this.tableName} WHERE "googleId" = $1 AND "deletedAt" IS NULL`,
        [googleId]
    );

    return result[0] ?? null;
  }

  async createGoogleUser(googleId: string, email: string, name: string, username: string): Promise<User> {
    const result = await this.dataSource.query(
        `INSERT INTO ${this.tableName} ("googleId", email, username, name, surname, "dateOfBirth", role)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [googleId, email, username, name, '', '1900-01-01', 'REGULAR']
    );

    return result[0];
  }

  private get tableName(): string {
    return this.dataSource.getMetadata(User).tableName;
  }
}
