import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExampleTable1775157508723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS examples (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                text varchar(255) NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deletedAt" timestamp NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS examples;
        `);
  }
}