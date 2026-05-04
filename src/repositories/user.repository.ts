import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities";


@injectable()
export class UserRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<User> {
        return this.dataSource.getRepository(User);
    }
}