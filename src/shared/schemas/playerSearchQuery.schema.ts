import { z } from 'zod';
import { SearchQuerySchema } from './searchQuery.schema';
import { Position } from '../enums';

export const PlayerSearchQuerySchema = SearchQuerySchema.extend({
  position: z.enum([Position.GOALKEEPER, Position.DEFENDER, Position.MIDFIELDER, Position.FORWARD]).optional(),
  clubId: z.uuid().optional(),
  minValue: z.coerce.number().optional(),
  maxValue: z.coerce.number().optional(),
});
