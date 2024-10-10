// cartSlice.js
import { ProductInfo } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "immer";

interface CartState {
  cart: ProductInfo[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductInfo>) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        state.cart = state.cart.map((cartItem) =>
          cartItem.id === product.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalProductPrice:
                  (cartItem.quantity + 1) * (cartItem.price[0].price || 0),
              }
            : cartItem,
        );
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
          totalProductPrice: product.price[0].price || 0,
        });
        state.totalQuantity += 1;
      }
      state.totalPrice += product.price[0].price || 0;
    },

    removeFromCart(state, action: PayloadAction<ProductInfo>) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          state.cart = state.cart.map((cartItem) =>
            cartItem.id === product.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                  totalProductPrice:
                    (cartItem.quantity - 1) * (cartItem.price[0].price || 0),
                }
              : cartItem,
          );
        } else {
          state.cart = state.cart.filter(
            (cartItem) => cartItem.id !== product.id,
          );
          state.totalQuantity -= 1;
        }

        state.totalPrice -= product.price[0].price || 0;
      }
    },

    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
