import { Request } from 'express';

export type TypedRequest<B = unknown, P = Record<string, never>, Q = Record<string, never>> = Request<P, unknown, B, Q>;
