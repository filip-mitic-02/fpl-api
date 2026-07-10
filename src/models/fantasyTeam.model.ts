import { Position } from '../shared';
import { PlayerModel } from './player.model';

export interface FantasyTeamModel {
  id: string;
  userId: string;
  name: string;
  value: number;
  points: number;
  transfersRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}

export type FantasyTeamPlayerModel = Pick<PlayerModel, 'id' | 'clubId' | 'name' | 'surname' | 'value' | 'position'> & {
  isCaptain: boolean;
  onBench: boolean;
};

export interface FantasyTeamWithPlayersModel extends FantasyTeamModel {
  players: FantasyTeamPlayerModel[];
}

export type FantasyTeamPlayerData = {
  playerId: string;
  isCaptain: boolean;
  onBench: boolean;
};

export interface FantasyTeamGameweekPlayerModel {
  id: string;
  name: string;
  surname: string;
  position: Position;
  gwPoints: number;
}

export interface FantasyTeamGameweekModel {
  id: string;
  name: string;
  players: FantasyTeamGameweekPlayerModel[];
  totalPoints: number;
}
