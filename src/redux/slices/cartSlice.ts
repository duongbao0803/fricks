// cartSlice.js
import { ProductInfo } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  data: ProductInfo[];
  totalQuantity: number;
  totalPrice: number;
  itemsPrice: number;
}

const initialState: CartState = {
  data: [],
  totalQuantity: 0,
  totalPrice: 0,
  itemsPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.data.find(
        (item: ProductInfo) => item.id === newItem.id,
      );
      let newTotalPrice = state.itemsPrice;

      if (!existingItem) {
        state.data.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
        state.totalPrice += newItem.price[0].price;
      } else {
        const increment = 1;
        existingItem.quantity += increment;
        state.totalQuantity += increment;
        state.totalPrice += existingItem.price[0].price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.data.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.data = state.data.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          state.totalPrice -= existingItem.price[0].price;
        }
      }
    },
    clearCart(state) {
      state.data = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
