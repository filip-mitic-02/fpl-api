export interface RegisterUserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  role: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
