export interface CreateGameweekPlayerRequest {
  playerId: string;
  goals: number;
  assists: number;
  cleanSheet: boolean;
  yellowCard: boolean;
  redCard: boolean;
  numOfMissedPenalties: number;
}
