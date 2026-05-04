import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { FantasyTeamChip } from "../entities";


@injectable()
export class FantasyTeamChipRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<FantasyTeamChip> {
        return this.dataSource.getRepository(FantasyTeamChip);
    }
}