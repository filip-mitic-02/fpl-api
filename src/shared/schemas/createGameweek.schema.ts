import z from 'zod';

export const CreateGameweekSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .max(30, 'Name must be at most 30 characters long.')
    .regex(/^[a-zA-ZÀ-ž0-9\s]+$/, 'Name can only contain letters, numbers and spaces.'),
  startDate: z.coerce.date('StartDate must be a valid date.'),
});
