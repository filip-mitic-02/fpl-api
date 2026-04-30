import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFantasyTeamsPlayersTable1777367567068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "fantasyTeamsPlayers"(
                "fantasyTeamId" uuid NOT NULL,
                "playerId" uuid NOT NULL,
                "isCaptain" boolean NOT NULL DEFAULT false,
                "isViceCaptain" boolean NOT NULL DEFAULT false,
                "onBench" boolean NOT NULL DEFAULT false,

                PRIMARY KEY("fantasyTeamId", "playerId"),

                CONSTRAINT "fk_fantasyTeamsPlayers_fantasyTeams"
                    FOREIGN KEY("fantasyTeamId")
                    REFERENCES "fantasyTeams"(id),

                CONSTRAINT "fk_fantasyTeamsPlayers_players"
                    FOREIGN KEY("playerId")
                    REFERENCES players(id)
            ); 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "fantasyTeamsPlayers"    
        `);
    }

}
