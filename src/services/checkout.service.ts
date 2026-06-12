import { post } from "@/lib/axiosClient";
import type {
  CheckoutRequest,
  CheckoutResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpResponse
} from "@/types/api/checkout.api";
import { API_ENDPOINTS } from "@/consts/api";

export const CheckoutService = {
  /**
   * Place a new order. Returns the created order data.
   */
  placeOrder: async (payload: CheckoutRequest): Promise<CheckoutResponse> => {
    return post<CheckoutResponse>(API_ENDPOINTS.CHECKOUT, payload);
  },
  
  verifyOtp: async (orderId: number, payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    return post<VerifyOtpResponse>(API_ENDPOINTS.VERIFY_OTP(orderId), payload);
  },

  resendOtp: async (orderId: number): Promise<ResendOtpResponse> => {
    return post<ResendOtpResponse>(API_ENDPOINTS.RESEND_OTP(orderId));
  }
};
