import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class FantasyTeamRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
