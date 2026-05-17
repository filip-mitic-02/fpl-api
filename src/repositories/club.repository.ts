import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class ClubRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
