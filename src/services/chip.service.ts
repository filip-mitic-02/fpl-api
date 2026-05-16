import { inject, injectable } from 'tsyringe';
import { ChipRepository } from '../repositories';

@injectable()
export class ChipService {
  constructor(
    @inject(ChipRepository)
    private readonly chipRepository: ChipRepository,
  ) {}
}
