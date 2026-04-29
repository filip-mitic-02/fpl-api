import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameweeksPlayersTable1777369271497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "gameweeks_Players"(
                "gameweekId" uuid NOT NULL,
                "playerId" uuid NOT NULL,
                goals integer NOT NULL DEFAULT 0,
                assists integer NOT NULL DEFAULT 0,
                "cleanSheet" boolean NOT NULL DEFAULT false,
                "minutesPlayed" integer NOT NULL DEFAULT 0,
                "yellowCard" boolean NOT NULL DEFAULT false,
                "redCard" boolean NOT NULL DEFAULT false,
                "goalsConceded" integer NOT NULL DEFAULT 0,
                "numOfMissedPenalties" integer NOT NULL DEFAULT 0,
                "gwPoints" integer NOT NULL DEFAULT 0,

                PRIMARY KEY("gameweekId", "playerId"),

                CONSTRAINT "fk_gameweeksPlayers_gameweeks"
                    FOREIGN KEY("gameweekId")
                    REFERENCES gameweeks(id),

                CONSTRAINT "fk_gameweeksPlayes_players"
                    FOREIGN KEY("playerId")
                    REFERENCES players(id)
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "gameweeks_Players"    
        `);
    }

}
