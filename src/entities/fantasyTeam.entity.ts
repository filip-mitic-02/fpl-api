import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('fantasyTeams')
export class FantasyTeam {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId'
    })
    user: User;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        type: 'decimal',
        precision: 4,
        scale: 1,
    })
    value: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    points: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    transfersRemaining: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}