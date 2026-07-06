import z from 'zod';
import { PlayerSearchQuerySchema } from "../schemas";

export type PlayerSearchQuery = z.infer<typeof PlayerSearchQuerySchema>;