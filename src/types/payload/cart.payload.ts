import type { CartItemProduct, CartItemVariant } from "@/types/cart";

export interface AddToCartPayload {
  productId: number;
  productVariantId: number;
  quantity: number;
  variant: CartItemVariant;
  product: CartItemProduct;
}
