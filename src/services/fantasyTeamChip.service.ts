import { inject, injectable } from 'tsyringe';
import { FantasyTeamChipRepository } from '../repositories';

@injectable()
export class FantasyTeamChipService {
  constructor(
    @inject(FantasyTeamChipRepository)
    private readonly fantasyTeamChipRepository: FantasyTeamChipRepository,
  ) {}
}
