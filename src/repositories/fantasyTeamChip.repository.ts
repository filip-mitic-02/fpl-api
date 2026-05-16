import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class FantasyTeamChipRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}
}
