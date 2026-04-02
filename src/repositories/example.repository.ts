import { inject, injectable } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { Example } from '../entities';

@injectable()
export class ExampleRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async findById(id: string): Promise<Example | null> {
    return this.repository.findOneBy({
      id,
    });
  }

  // ## PRIVATE
  private get repository(): Repository<Example> {
    return this.dataSource.getRepository(Example);
  }
}
