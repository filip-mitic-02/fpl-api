export interface GameweekPlayerModel {
  gameweekId: string;
  playerId: string;
  goals: number;
  assists: number;
  cleanSheet: boolean;
  yellowCard: boolean;
  redCard: boolean;
  numOfMissedPenalties: number;
  gwPoints: number;
}
