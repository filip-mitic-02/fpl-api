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
