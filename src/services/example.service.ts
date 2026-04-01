import { inject, injectable } from 'tsyringe';
import { ExampleRepository } from '../repositories/';

@injectable()
export class ExampleService {
    constructor(@inject(ExampleRepository) private readonly exampleRepository: ExampleRepository) { }

    async getExampleById(id: string): Promise<string | null> {
        return this.exampleRepository.findById(id);
    }

}