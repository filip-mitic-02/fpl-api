import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGameweeksTable1777368918178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS gameweeks(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar(100) NOT NULL,
                "startDate" date NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            );    
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS gameweeks
        `);
  }
}
