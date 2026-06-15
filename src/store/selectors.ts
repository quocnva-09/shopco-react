import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { buildLineItems } from "@/utils/cart";

/**
 * Derives the order summary line items (subtotal, discount, delivery) from cart state.
 * Memoized — only recomputes when cartItems, deliveryFee, or discount change.
 */
export const selectCartLineItems = createSelector(
  (state: RootState) => state.cart.cartItems,
  (state: RootState) => state.cart.deliveryFee,
  (state: RootState) => state.cart.discount,
  (cartItems, deliveryFee, discount) =>
    buildLineItems(cartItems, deliveryFee, discount),
);

/** Derives the final order total from the line items. */
export const selectCartTotal = createSelector(
  selectCartLineItems,
  (lineItems) => lineItems.reduce((sum, item) => sum + item.value, 0),
);

/** Derives the total item count across all cart entries. */
export const selectCartItemCount = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) => cartItems.reduce((sum, item) => sum + item.quantity, 0),
);
