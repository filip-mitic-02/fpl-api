import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFantasyTeamsChipsTable1777363263290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "fantasyTeamsChips"(
                "fantasyTeamId" uuid NOT NULL,
                "chipId" uuid NOT NULL,
                "isUsed" boolean NOT NULL DEFAULT false,
                "gameweekId" uuid,

                PRIMARY KEY("fantasyTeamId", "chipId"),

                CONSTRAINT "fk_fantasyTeamsChips_fantasyTeam"
                    FOREIGN KEY("fantasyTeamId")
                    REFERENCES "fantasyTeams"(id),

                CONSTRAINT "fk_fantasyTeamsChips_chip"
                    FOREIGN KEY("chipId")
                    REFERENCES chips(id),

                CONSTRAINT "fk_fantasyTeamsChips_gameweek"
                    FOREIGN KEY("gameweekId")
                    REFERENCES gameweeks(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "fantasyTeamsChips"    
        `);
  }
}
