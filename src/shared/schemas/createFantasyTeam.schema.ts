import { z } from 'zod';

export const CreateFantasyTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .max(50, 'Name must be at most 50 characters long.')
    .regex(/^[a-zA-ZÀ-ž0-9\s\-&']+$/, "Name can only contain letters, numbers, spaces and - & '."),
  players: z.array(z.uuid('Invalid playerId format.')).length(15, 'Team must have exactly 15 players.'),
});
