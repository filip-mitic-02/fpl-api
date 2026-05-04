import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Club } from "../entities";


@injectable()
export class ClubRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<Club> {
        return this.dataSource.getRepository(Club);
    }
}