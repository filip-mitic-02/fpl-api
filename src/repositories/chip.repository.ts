import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { ChipModel } from '../models';
import { Chip } from '../entities';
import { ChipType } from '../shared';

@injectable()
export class ChipRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<ChipModel[]> {
    return await this.dataSource.query(`SELECT id, type FROM ${this.tableName}`);
  }

  async findByType(type: ChipType): Promise<ChipModel | null> {
    const result = await this.dataSource.query(`SELECT id, type FROM ${this.tableName} WHERE type = $1`, [type]);

    return result[0] ?? null;
  }

  private get tableName(): string {
    return `${this.dataSource.getMetadata(Chip).tableName}`;
  }
}
