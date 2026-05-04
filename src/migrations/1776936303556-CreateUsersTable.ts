import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1776936303556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TYPE "userRole" AS ENUM ('USER', 'ADMIN');    
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar(255) NOT NULL,
                surname varchar(255) NOT NULL,
                email varchar(255) NOT NULL UNIQUE,
                username varchar(255) NOT NULL UNIQUE,
                password varchar(255) NOT NULL,
                role "userRole" NOT NULL DEFAULT 'USER',
                "dateOfBirth" date NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deletedAt" timestamp NULL 
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS users
        `)

        await queryRunner.query(`
            DROP TYPE IF EXISTS "userRole"    
        `);
    }

}
