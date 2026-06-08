export interface CartItemProduct {
  id: number;
  name: string;
  imgPath: string;
  price: number;
  priceDiscount: number;
}

export interface CartItemVariant {
  id: number;
  colorId: number;
  color: string;
  colorHex: string;
  sizeId: number;
  size: string;
  sizeLabel: string;
}

export interface CartItem {
  productId: number;
  productVariantId: number;
  quantity: number;
  variant: CartItemVariant;
  product: CartItemProduct;
}
export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}
