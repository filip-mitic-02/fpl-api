import z from 'zod';

export const GameweekParamsSchema = z.object({
  id: z.uuid('Invalid ID format.'),
  gameweekId: z.uuid('Invalid gameweek ID format.'),
});
