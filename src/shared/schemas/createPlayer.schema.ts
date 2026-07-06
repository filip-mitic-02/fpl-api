import { z } from 'zod';
import { Position } from '../enums';

export const CreatePlayerSchema = z.object({
  clubId: z
    .uuid('Invalid clubId format.')
    .trim(),
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long.')
    .max(30, 'Name must be at most 30 characters long.')
    .regex(/^[a-zA-ZÀ-ž']+$/, "Name can only contain letters."),
  surname: z
    .string()
    .trim()
    .min(2, 'Surname must be at least 2 characters long.')
    .max(30, 'Surname must be at most 30 characters long.')
    .regex(/^[a-zA-ZÀ-ž']+$/, "Name can only contain letters."),
  value: z
    .coerce.number()
    .min(4.0, 'Value can not be less than 4.0 millions.')
    .max(15.0, 'Value can not be more than 15.0 millions.'),
  position: z
    .enum([Position.GOALKEEPER, Position.DEFENDER, Position.MIDFIELDER, Position.FORWARD]),
});
