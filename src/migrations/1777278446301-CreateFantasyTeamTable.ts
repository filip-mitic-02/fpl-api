import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFantasyTeamTable1777278446301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "fantasyTeams" (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                name varchar(255) NOT NULL,
                value decimal(4,1) NOT NULL,
                points integer NOT NULL DEFAULT 0,
                "transfersRemaining" integer NOT NULL DEFAULT 0,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_fantasyTeam_user
                    FOREIGN KEY ("userId")
                    REFERENCES users(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "fantasyTeams"
        `)
    }

}
