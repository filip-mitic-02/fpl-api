import { Position } from '../enums';

export interface FantasyTeamRow {
  id: string;
  userId: string;
  name: string;
  value: number;
  points: number;
  transfersRemaining: number;
  createdAt: Date;
  updatedAt: Date;
  playerId: string;
  clubId: string;
  playerName: string;
  surname: string;
  playerValue: number;
  position: Position;
  isCaptain: boolean;
  onBench: boolean;
}
