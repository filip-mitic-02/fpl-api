import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants';

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().regex(EMAIL_REGEX, 'Email must be in a valid format.'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(72, 'Password must be at most 72 characters long.')
    .regex(PASSWORD_REGEX, 'Password must contain at least one uppercase letter, lowercase letter, number and special character.'),
});
