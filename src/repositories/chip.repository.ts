import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Chip } from "../entities";


@injectable()
export class ChipRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<Chip> {
        return this.dataSource.getRepository(Chip);
    }
}