import { Position } from '../shared';

export interface PlayerModel {
  id: string;
  clubId: string;
  name: string;
  surname: string;
  value: number;
  position: Position;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type PlayerValidationData = Pick<PlayerModel, 'id' | 'clubId' | 'position' | 'value'>;
