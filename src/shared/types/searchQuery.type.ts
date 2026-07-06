import z from 'zod';
import { SearchQuerySchema } from '../schemas';

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
