import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Club } from './';
import { Position } from '../shared';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clubId: string;

  @ManyToOne(() => Club)
  @JoinColumn({
    name: 'clubId',
  })
  club: Club;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  surname: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
  })
  value: number;

  @Column({
    type: 'enum',
    enum: Position,
  })
  position: Position;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
