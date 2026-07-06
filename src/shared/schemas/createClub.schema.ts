import { z } from 'zod';

export const CreateClubSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .max(70, 'Name must be at most 70 characters long.')
    .regex(/^[a-zA-ZÀ-ž0-9\s\-&']+$/, "Name can only contain letters, numbers, spaces and - & '."),
  initials: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, 'Initials must be at least 2 characters long.')
    .max(4, 'Initials must be at most 4 characters long.')
    .regex(/^[A-Z]{2,4}$/, 'Initials can only contain letters.'),
});
