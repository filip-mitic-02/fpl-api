import { inject, injectable } from 'tsyringe';
import { GameweekPlayerRepository } from '../repositories';

@injectable()
export class GameweekPlayerService {
  constructor(
    @inject(GameweekPlayerRepository)
    private readonly gameweekPlayerRepository: GameweekPlayerRepository,
  ) {}
}
