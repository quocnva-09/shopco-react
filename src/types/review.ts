export interface ReviewData {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}
