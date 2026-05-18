import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { ValidationException } from '../exceptions';

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationException(
        'Validation failed.',
        result.error.issues.map((issue) => ({
          field: String(issue.path[0]),
          message: issue.message,
        })),
      );
    }

    req.body = result.data;
    next();
  };
};
