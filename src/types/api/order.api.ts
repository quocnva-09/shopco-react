export interface OrderProductImageApi {
  id: number;
  img_path: string;
}

export interface OrderProductApi {
  id: number;
  name: string;
  images: OrderProductImageApi[];
}

export interface OrderItemApi {
  id: number;
  product_variant_id: number;
  product_name: string;
  product_variant_name: string;
  quantity: number;
  price: number;
  totalMoney: number;
  product: OrderProductApi;
}

export interface OrderApi {
  id: number;
  user_id: number | null;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  guest_address: string;
  status: string;
  totalAmount: number;
  delivery_fee: number;
  discount: number;
  created_at: string;
  updated_at: string;
  items: OrderItemApi[];
}
