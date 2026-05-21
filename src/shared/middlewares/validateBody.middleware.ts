import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { BadRequestException } from '../exceptions';

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new BadRequestException(
        'Validation failed.',
        result.error.issues.map((issue) => issue.message),
      );
    }

    req.body = result.data;
    next();
  };
};
