import { JwtPayload } from '../shared/interfaces/jwtPayload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
