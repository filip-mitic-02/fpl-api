import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Stadium } from "../entities";


@injectable()
export class StadiumRepository {
    constructor(
        @inject('DataSource')
        private readonly dataSource: DataSource,
    ){}

    private get repository(): Repository<Stadium> {
        return this.dataSource.getRepository(Stadium);
    }
}