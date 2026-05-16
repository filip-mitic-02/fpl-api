import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class StadiumRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
