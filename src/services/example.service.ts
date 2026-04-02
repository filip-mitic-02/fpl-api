import { inject, injectable } from 'tsyringe';
import { ExampleRepository } from '../repositories/';
import { Example } from '../entities';

@injectable()
export class ExampleService {
  constructor(
    @inject(ExampleRepository)
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async getExampleById(id: string): Promise<Example | null> {
    return this.exampleRepository.findById(id);
  }
}
