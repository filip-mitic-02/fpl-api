export interface ClubModel {
  id: string;
  name: string;
  initials: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
