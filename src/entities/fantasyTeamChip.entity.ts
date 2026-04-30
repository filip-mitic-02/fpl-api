import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { FantasyTeam } from "./fantasyTeam.entity";
import { Chip } from "./chip.entity";


@Entity('fantasyTeams_Chips')
export class FantasyTeamChip {
    @PrimaryColumn()
    fantasyTeamId: string;

    @PrimaryColumn()
    chipId: string;

    @ManyToOne(() => FantasyTeam)
    @JoinColumn({
        name: 'fantasyTeamId'
    })
    fantasyTeam: FantasyTeam;

    @ManyToOne(() => Chip)
    @JoinColumn({
        name: 'chipId'
    })
    chip: Chip;

    @Column({
        type: 'boolean',
        default: false,
    })
    isUsed: boolean;
}