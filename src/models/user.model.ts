import { Role } from '../shared';

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string | null;
  googleId: string | null;
  role: Role;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserPublicInfo = Omit<UserModel, 'password' | 'googleId'>;
