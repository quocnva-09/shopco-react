import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/cart";
import type { AddToCartPayload } from "@/types/payload/cart.payload";

interface InitialState {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

const initialState: InitialState = {
  cartItems: [],
  subtotal: 0,
  discount: 0,
  deliveryFee: 15,
  total: 0,
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
      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.cartItems.push(payload);
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
        existingItem.quantity = quantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const productVariantId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productVariantId !== productVariantId,
      );
    },
  },
});

export const { addToCart, updateQuantity, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
