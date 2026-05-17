import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { RegisterUserRequest, UserResponse } from '../shared/interfaces';

@injectable()
export class UserRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
    const [{ count }] = await this.dataSource.query(`SELECT COUNT(*)::int FROM users WHERE email = $1 OR username = $2`, [email, username]);

    return count > 0;
  }

  async createUser(userData: RegisterUserRequest): Promise<UserResponse> {
    const { name, surname, email, username, password, dateOfBirth } = userData;
    const createdUser = await this.dataSource.query(
      `INSERT INTO users (name, surname, email, username, password, "dateOfBirth") VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, name, surname, email, username, role, "dateOfBirth", "createdAt", "updatedAt", "deletedAt"`,
      [name, surname, email, username, password, dateOfBirth],
    );

    return createdUser[0];
  }
}
