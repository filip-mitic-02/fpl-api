import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Player } from "../entities";


@injectable()
export class PlayerRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<Player> {
        return this.dataSource.getRepository(Player);
    }
}