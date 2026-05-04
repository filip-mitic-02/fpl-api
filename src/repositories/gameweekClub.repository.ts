import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { GameweekClub } from "../entities";


@injectable()
export class GameweekClubRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<GameweekClub> {
        return this.dataSource.getRepository(GameweekClub);
    }
}