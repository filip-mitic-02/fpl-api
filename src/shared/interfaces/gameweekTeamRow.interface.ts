import { Position } from '../enums';

export interface GameweekTeamRow {
  id: string;
  teamName: string;
  playerId: string;
  playerName: string;
  surname: string;
  position: Position;
  gwPoints: number;
  onBench: boolean;
  isCaptain: boolean;
}
