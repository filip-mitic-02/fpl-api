import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Gameweek } from "./gameweek.entity";
import { Club } from "./club.entity";
import { Stadium } from "./stadium.entity";


@Entity('gameweeks_Clubs')
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