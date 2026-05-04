import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { FantasyTeamPlayer } from "../entities";


@injectable()
export class FantasyTeamPlayerRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<FantasyTeamPlayer> {
        return this.dataSource.getRepository(FantasyTeamPlayer);
    }
}