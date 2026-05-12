import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities";
import { UserResponse } from "../shared/interfaces";


@injectable()
export class UserRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    async findByEmailOrUsername(email: string, username: string): Promise<boolean> {
        const result = await this.dataSource.query(
            `SELECT email, username FROM users WHERE email = $1 OR username = $2`,
            [email, username]
        );

        return result.length > 0;
    }

    async createUser(name: string, surname: string, email: string, username: string, hashedPassword: string, dateOfBirth: Date): Promise<UserResponse> {
        const createdUser = await this.dataSource.query(
            `INSERT INTO users (name, surname, email, username, password, "dateOfBirth") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, surname, email, username, hashedPassword, dateOfBirth]
        );

        const { password, ...userWithoutPassword } = createdUser[0];
        return userWithoutPassword;
    }

    private get repository(): Repository<User> {
        return this.dataSource.getRepository(User);
    }
}