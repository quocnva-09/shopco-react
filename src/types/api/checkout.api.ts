import type { ApiResponse } from "./api";
import type { OrderApi } from "./order.api";

//  Request

export interface CheckoutItemRequest {
  product_id: number;
  product_variant_id: number;
  color_id: number;
  size_id: number;
  quantity: number;
}

export interface CheckoutRequest {
  items: CheckoutItemRequest[];
  delivery_fee: number;
  discount: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  guest_address: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

//  Response

export interface CheckoutResponse extends ApiResponse<OrderApi> {}
export interface VerifyOtpResponse extends ApiResponse<null> {}
export interface ResendOtpResponse extends ApiResponse<null> {}
