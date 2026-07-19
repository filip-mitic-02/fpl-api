import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { BadRequestException } from '../exceptions';

export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      throw new BadRequestException('Invalid ID format.');
    }
    next();
  };
};
