export interface ReviewData {
  id: string | number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}
