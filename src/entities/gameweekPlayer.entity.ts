import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Gameweek, Player } from './';

@Entity('gameweeksPlayers')
export class GameweekPlayer {
  @PrimaryColumn()
  gameweekId: string;

  @PrimaryColumn()
  playerId: string;

  @ManyToOne(() => Gameweek)
  @JoinColumn({
    name: 'gameweekId',
  })
  gameweek: Gameweek;

  @ManyToOne(() => Player)
  @JoinColumn({
    name: 'playerId',
  })
  player: Player;

  @Column({
    type: 'integer',
    default: 0,
  })
  goals: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  assists: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  cleanSheet: boolean;

  @Column({
    type: 'integer',
    default: 0,
  })
  minutesPlayed: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  yellowCard: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  redCard: boolean;

  @Column({
    type: 'integer',
    default: 0,
  })
  goalsConceded: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  numOfMissedPenalties: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  gwPoints: number;
}
