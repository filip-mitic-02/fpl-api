import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities";
import { RegisterUserRequest, UserResponse } from "../shared/interfaces";


@injectable()
export class UserRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
        const result = await this.dataSource.query(
            `SELECT COUNT(*) FROM users WHERE email = $1 OR username = $2`,
            [email, username]
        );

        return parseInt(result[0].count) > 0;
    }

    async createUser(userData: RegisterUserRequest): Promise<UserResponse> {
        const {name, surname, email, username, password, dateOfBirth} = userData;
        const createdUser = await this.dataSource.query(
            `INSERT INTO users (name, surname, email, username, password, "dateOfBirth") VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, name, surname, email, username, role, "dateOfBirth", "createdAt", "updatedAt", "deletedAt"`,
            [name, surname, email, username, password, dateOfBirth]
        );

        return createdUser[0];
    }

    private get repository(): Repository<User> {
        return this.dataSource.getRepository(User);
    }
}