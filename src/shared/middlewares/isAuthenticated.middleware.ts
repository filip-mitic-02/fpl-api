import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import jwt from 'jsonwebtoken';
import { envConfig } from '../../config';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException('User is not authentificated. Please log in.');
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const tokenInfo = jwt.verify(accessToken, envConfig.JWT_SECRET) as { userId: string; role: string };
    req.user = tokenInfo;
    next();
  } catch {
    throw new UnauthorizedException('Token is invalid or expired.');
  }
};
