import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../shared";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    surname: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        type: 'enum',
        enum: Role
    })
    role: Role;

    @Column({
        type: 'date'
    })
    dateOfBirth: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}