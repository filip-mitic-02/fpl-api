import { JwtPayload } from '../interfaces';
import { TypedRequest } from './typedRequest.type';

export type AuthenticatedRequest<B = unknown, P = Record<string, never>, Q = Record<string, never>> = TypedRequest<B, P, Q> & {
  user: JwtPayload;
};
