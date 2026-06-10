import { post } from "@/lib/axiosClient";
import type {
  CheckoutRequest,
  CheckoutResponse,
} from "@/types/api/checkout.api";

export const CheckoutService = {
  /**
   * Place a new order. Returns the created order data.
   */
  placeOrder: async (payload: CheckoutRequest): Promise<CheckoutResponse> => {
    return post<CheckoutResponse>("/guest/orders/checkout", payload);
  },
};
