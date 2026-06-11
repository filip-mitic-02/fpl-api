import z from 'zod';

export const SearchQuerySchema = z.object({
  limit: z.coerce.number().optional().default(10),
  offset: z.coerce.number().optional().default(0),
  search: z.string().optional().default(''),
});
