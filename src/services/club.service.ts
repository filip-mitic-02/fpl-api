import { inject, injectable } from 'tsyringe';
import { ClubRepository } from '../repositories';

@injectable()
export class ClubService {
  constructor(
    @inject(ClubRepository)
    private readonly clubRepository: ClubRepository,
  ) {}
}
