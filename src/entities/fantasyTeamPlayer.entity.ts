import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FantasyTeam, Player } from './';

@Entity('fantasyTeamsPlayers')
export class FantasyTeamPlayer {
  @PrimaryColumn()
  fantasyTeamId: string;

  @PrimaryColumn()
  playerId: string;

  @ManyToOne(() => FantasyTeam)
  @JoinColumn({
    name: 'fantasyTeamId',
  })
  fantasyTeam: FantasyTeam;

  @ManyToOne(() => Player)
  @JoinColumn({
    name: 'playerId',
  })
  player: Player;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCaptain: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isViceCaptain: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  onBench: boolean;
}
