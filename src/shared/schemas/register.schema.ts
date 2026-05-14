import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants';

export const RegisterSchema = z.object ({
    name: z.string().trim().min(2, 'Name must be at least 2 characters long.').max(50, 'Name must be at most 50 characters long.').regex(/^[a-zA-ZÀ-ž]+$/, 'Name can only contain letters.'),
    surname: z.string().trim().min(2, 'Surname must be at least 2 characters long.').max(50, 'Surname must be at most 50 characters long.').regex(/^[a-zA-ZÀ-ž]+$/, 'Surname can only contain letters.'),
    email: z.string().trim().toLowerCase().regex(EMAIL_REGEX, 'Email must be in a valid format.'),
    username: z.string().trim().min(3, 'Username must be at least 3 characters long.').max(50, 'Username must be at most 50 characters long.').regex(/^[a-zA-Z0-9_-]+$/, 'Username can contain only alphanumeric characters, _ and -.'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters long.').max(72, 'Password must be at most 72 characters long.').regex(PASSWORD_REGEX, 'Password must contain at least one uppercase letter, lowercase letter, number and special character.'),
    dateOfBirth: z.coerce.date().refine((dob) => {
        const minAge = new Date();
        minAge.setFullYear(minAge.getFullYear() - 12);
        return dob <= minAge;
    }, 'You must be at least 12 years old.'), // this converts string to JS date object, but if we want to work with string I can use .string() and regex here?
}).superRefine((val, ctx) => {
    if(val.password.toLowerCase().includes(val.username.toLowerCase())){
        ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'Password can not include username!'
        });
    }

    if(val.password.toLowerCase().includes(val.email.toLowerCase())){
        ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'Password can not include email address!'
        });
    }

    const dob = val.dateOfBirth;
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = String(dob.getFullYear());

    const dobCombinations = [day+month+year, year+month+day, day+month, month+day, year];

    if(dobCombinations.some(combo => val.password.includes(combo))){
        ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'Password can not include date of birth or any parts of it!'
        });
    }
});