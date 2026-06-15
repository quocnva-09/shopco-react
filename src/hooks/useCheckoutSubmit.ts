import { useCallback } from "react";
import { useSubmit } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export type PaymentMethod = "cod" | "bank_transfer" | "credit_card";

export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
}

export const useCheckoutSubmit = () => {
  const submit = useSubmit();
  const { cartItems, deliveryFee, discount } = useSelector(
    (state: RootState) => state.cart
  );

  const onSubmit = useCallback(
    (data: CheckoutFormData) => {
      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.productId,
          product_variant_id: item.productVariantId,
          color_id: item.variant.colorId,
          size_id: item.variant.sizeId,
          quantity: item.quantity,
        })),
        delivery_fee: deliveryFee,
        discount,
        guest_name: data.fullName,
        guest_phone: data.phoneNumber,
        guest_email: data.email,
        guest_address: data.address,
      };

      submit(
        { payload: JSON.stringify(payload) },
        { method: "post", encType: "application/json" }
      );
    },
    [cartItems, deliveryFee, discount, submit]
  );

  return { onSubmit };
};
