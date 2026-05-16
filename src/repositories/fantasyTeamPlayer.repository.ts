import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class FantasyTeamPlayerRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
