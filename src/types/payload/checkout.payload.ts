export interface CheckoutItem {
  productId: number;
  productVariantId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
}

export interface CheckoutPayload {
  items: CheckoutItem[];
  deliveryFee: number;
  discount: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  guestAddress: string;
}
