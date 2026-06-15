import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/cart";
import type { AddToCartPayload } from "@/types/payload/cart.payload";
import { MAX_PER_ITEM, MAX_TOTAL_QUANTITY } from "@/consts/config";

// subtotal and total are derived values — computed by selectors in store/selectors.ts
export interface CartState {
  cartItems: CartItem[];
  discount: number;
  deliveryFee: number;
}

const initialState: CartState = {
  cartItems: [],
  discount: 0,
  deliveryFee: 15,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const payload = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productVariantId === payload.productVariantId,
      );
      const totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

      if (existingItem) {
        const remainingGlobal = MAX_TOTAL_QUANTITY - totalQuantity;
        const remainingItem = MAX_PER_ITEM - existingItem.quantity;
        const maxAddable = Math.max(0, Math.min(remainingGlobal, remainingItem));

        existingItem.quantity += Math.min(payload.quantity, maxAddable);
      } else {
        const remainingGlobal = MAX_TOTAL_QUANTITY - totalQuantity;
        const maxAddable = Math.max(0, Math.min(remainingGlobal, MAX_PER_ITEM));

        payload.quantity = Math.min(payload.quantity, maxAddable);
        if (payload.quantity > 0) {
          state.cartItems.push(payload);
        }
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productVariantId: number; quantity: number }>,
    ) => {
      const { productVariantId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productVariantId === productVariantId,
      );
      if (existingItem) {
        const otherItemsQuantity = state.cartItems.reduce(
          (sum, item) => sum + (item.productVariantId === productVariantId ? 0 : item.quantity),
          0
        );
        const remainingGlobal = MAX_TOTAL_QUANTITY - otherItemsQuantity;
        const maxAllowed = Math.min(remainingGlobal, MAX_PER_ITEM);
        existingItem.quantity = Math.max(1, Math.min(quantity, maxAllowed));
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const productVariantId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productVariantId !== productVariantId,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.discount = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

