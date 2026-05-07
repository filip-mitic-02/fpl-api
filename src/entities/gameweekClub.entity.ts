import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Gameweek, Club, Stadium } from "./";

@Entity('gameweeksClubs')
export class GameweekClub {
    @PrimaryColumn()
    gameweekId: string;

    @PrimaryColumn()
    clubId: string;

    @ManyToOne(() => Gameweek)
    @JoinColumn({
        name: 'gameweekId'
    })
    gameweek: Gameweek;

    @ManyToOne(() => Club)
    @JoinColumn({
        name: 'clubId'
    })
    club: Club;

    @Column()
    stadiumId: string;

    @ManyToOne(() => Stadium)
    @JoinColumn({
        name: 'stadiumId'
    })
    stadium: Stadium;

    @Column({
        type: 'date'
    })
    date: Date;

}