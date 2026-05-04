import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayersTable1777366143946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TYPE "positionsAvailable" AS ENUM ('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD');
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS players(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "clubId" uuid NOT NULL,
                name varchar(100) NOT NULL,
                surname varchar(100) NOT NULL,
                value DECIMAL(3,1) NOT NULL,
                position "positionsAvailable" NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deletedAt" timestamp NULL,

                CONSTRAINT fk_players_clubs
                    FOREIGN KEY("clubId")
                    REFERENCES clubs(id)
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS players    
        `);

        await queryRunner.query(`
            DROP TYPE IF EXISTS "positionsAvailable"    
        `);
    }

}
