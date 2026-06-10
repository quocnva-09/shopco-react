export interface WriteReviewPayload {
  order_id: number;
  product_id: number;
  rating: number;
  comment: string;
  guest_name: string;
  guest_email: string;
}
