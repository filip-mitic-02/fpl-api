import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { GameweekPlayer } from "../entities";


@injectable()
export class GameweekPlayerRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<GameweekPlayer> {
        return this.dataSource.getRepository(GameweekPlayer);
    }
}