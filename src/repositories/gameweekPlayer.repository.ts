import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class GameweekPlayerRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
