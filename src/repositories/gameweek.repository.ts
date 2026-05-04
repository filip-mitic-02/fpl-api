import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Gameweek } from "../entities";


@injectable()
export class GameweekRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<Gameweek> {
        return this.dataSource.getRepository(Gameweek);
    }
}