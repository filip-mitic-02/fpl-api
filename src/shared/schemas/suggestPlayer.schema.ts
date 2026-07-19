import { z } from 'zod';
import { Position } from '../enums';

export const SuggestPlayersSchema = z.object({
  position: z.enum([Position.GOALKEEPER, Position.DEFENDER, Position.MIDFIELDER, Position.FORWARD]),
  maxPrice: z.coerce.number().min(4.0, 'Max price must be at least 4.0.').max(15.0, 'Max price can not exceed 15.0.'),
});
