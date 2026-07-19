import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../exceptions';

export const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      throw new BadRequestException(result.error.issues.map((issue) => issue.message).join(', '));
    }
    next();
  };
};
