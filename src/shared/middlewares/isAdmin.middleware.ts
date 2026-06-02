import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { Role } from '../enums';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (role !== Role.ADMIN) {
    throw new ForbiddenException('You are not authorized to do that.');
  }

  next();
};
