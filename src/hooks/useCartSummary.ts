import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  selectCartLineItems,
  selectCartTotal,
} from "@/store/selectors";

/**
 * Provides pre-computed cart summary values for Cart and Checkout pages.
 * Centralises the `buildLineItems` + `reduce` derivation that was previously
 * duplicated across both pages.
 */
export const useCartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const lineItems = useSelector(selectCartLineItems);
  const total = useSelector(selectCartTotal);

  return { cartItems, lineItems, total, deliveryFee, discount };
};
