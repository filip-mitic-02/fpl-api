import { z } from 'zod';

export const WildcardSchema = z.object({
  players: z.array(z.uuid('Invalid playerId format.')).length(15, 'Team must have exactly 15 players.'),
  captainId: z.uuid('Invalid captainId format.'),
});
