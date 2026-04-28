import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClubsTable1777365065675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS clubs(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar(100) NOT NULL,
                initials varchar(5) NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deletedAt" timestamp NULL
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS clubs    
        `);
    }

}
