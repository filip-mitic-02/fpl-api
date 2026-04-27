import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChipsTable1777288678826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "chipsAvailable" AS ENUM ('BENCH_BOOST', 'FREE_HIT', 'TRIPLE_CAPTAIN', 'WILDCARD')
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS chips(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                type "chipsAvailable" NOT NULL
            )    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS chips    
        `);

        await queryRunner.query(`
            DROP TYPE IF EXISTS "chipsAvailable"    
        `);
    }

}
