import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FantasyTeam, Chip, Gameweek } from './';

@Entity('fantasyTeamsChips')
export class FantasyTeamChip {
  @PrimaryColumn()
  fantasyTeamId: string;

  @PrimaryColumn()
  chipId: string;

  @ManyToOne(() => FantasyTeam)
  @JoinColumn({
    name: 'fantasyTeamId',
  })
  fantasyTeam: FantasyTeam;

  @ManyToOne(() => Chip)
  @JoinColumn({
    name: 'chipId',
  })
  chip: Chip;

  @Column({
    type: 'boolean',
    default: false,
  })
  isUsed: boolean;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  gameweekId: string | null;

  @ManyToOne(() => Gameweek, { nullable: true })
  @JoinColumn({
    name: 'gameweekId',
  })
  gameweek: Gameweek | null;
}
