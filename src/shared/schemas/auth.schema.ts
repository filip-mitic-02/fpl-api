import { z } from 'zod';

export const RegisterSchema = z.object ({
    name: z.string().trim().min(2).max(50).regex(/^[a-zA-ZÀ-ž]+$/),
    surname: z.string().trim().min(2).max(50).regex(/^[a-zA-ZÀ-ž]+$/),
    email: z.string().trim().toLowerCase().regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/),
    password: z.string().trim().min(8).max(72).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&*\(\)_+\-=\[\]\{\};:'",.<>?\/|\\`]).*$/),
    dateOfBirth: z.coerce.date(), // this converts string to JS date object, but if we want to work with string I can use .string() and regex here?
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