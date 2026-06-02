import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { RegisterUserRequest } from '../shared/interfaces';
import { User } from '../entities';
import { UserPublicInfo } from '../models';

@injectable()
export class UserRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM ${this.tableName} WHERE email = $1 OR username = $2`, [
      email,
      username,
    ]);

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

  private get tableName(): string {
    return this.dataSource.getMetadata(User).tableName;
  }
}
