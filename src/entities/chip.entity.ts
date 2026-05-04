import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ChipType } from "../shared";

@Entity('chips')
export class Chip {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ChipType,
    })
    type: ChipType;
}