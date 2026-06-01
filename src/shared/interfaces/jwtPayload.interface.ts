import { Role } from '../enums';

export interface JwtPayload {
  userId: string;
  role: Role;
}
