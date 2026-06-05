import { UserPublicInfo } from '../../models';

export interface PaginatedUsers {
  users: UserPublicInfo[];
  total: number;
}
