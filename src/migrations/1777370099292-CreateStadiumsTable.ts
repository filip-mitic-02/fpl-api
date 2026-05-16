import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStadiumsTable1777370099292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS stadiums(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar(100) NOT NULL  
            );    
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS stadiums    
        `);
  }
}
