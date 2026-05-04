import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameweeksClubsTable1777370361863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "gameweeksClubs"(
                "gameweekId" uuid NOT NULL,
                "clubId" uuid NOT NULL,
                "stadiumId" uuid NOT NULL,
                date date NOT NULL,

                PRIMARY KEY("gameweekId", "clubId"),

                CONSTRAINT "fk_gameweeksClubs_gameweeks"
                    FOREIGN KEY("gameweekId")
                    REFERENCES gameweeks(id),

                CONSTRAINT "fk_gameweeksClubs_clubs"
                    FOREIGN KEY("clubId")
                    REFERENCES clubs(id),

                CONSTRAINT "fk_gameweeksClubs_stadiums"
                    FOREIGN KEY("stadiumId")
                    REFERENCES stadiums(id)
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "gameweeksClubs"    
        `);
    }

}
