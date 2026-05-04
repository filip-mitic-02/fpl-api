import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stadiums')
export class Stadium {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    name: string;
    
}