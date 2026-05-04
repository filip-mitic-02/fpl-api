import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { FantasyTeam } from "../entities";


@injectable()
export class FantasyTeamRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<FantasyTeam> {
        return this.dataSource.getRepository(FantasyTeam);
    }
}