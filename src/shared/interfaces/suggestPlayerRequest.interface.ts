import { Position } from '../enums';

export interface SuggestPlayersRequest {
  position: Position;
  maxPrice: number;
}
