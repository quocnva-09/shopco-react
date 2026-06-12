export interface OrderProductImage {
  id: number;
  imgPath: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  images: OrderProductImage[];
}

export interface OrderItem {
  id: number;
  productVariantId: number;
  productName: string;
  productVariantName: string;
  quantity: number;
  price: number;
  totalMoney: number;
  product: OrderProduct;
}

export interface Order {
  id: number;
  userId: number | null;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  guestAddress: string;
  status: string;
  totalAmount: number;
  deliveryFee: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
