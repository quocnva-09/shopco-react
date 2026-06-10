export interface WriteReviewPayload {
  order_id: number | undefined;
  product_id: number;
  rating: number;
  comment: string;
  guest_name: string;
  guest_email: string;
}
