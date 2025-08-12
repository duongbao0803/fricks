import { CartUser } from "@/types/personal.types";
import { ProductInfo } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem extends ProductInfo {
  quantity: number;
  totalProductPrice: number;
  selectedUnit: { name: string; price: number; id: number } | null;
}

interface CartState {
  cart: CartItem[];
  cartUser: CartUser;
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  cartUser: {
    email: "",
    fullName: "",
    customerAddress: "",
    customerPhone: "",
  },
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        product: ProductInfo & {
          selectedUnit: { name: string; price: number; id: number } | null;
        };
        quantity: number;
      }>,
    ) {
      const { product, quantity } = action.payload;
      const selectedUnit = action.payload.product.selectedUnit;
      const priceToUse = selectedUnit?.price ?? product.price[0].price ?? 0;

      const existingItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.selectedUnit?.name === selectedUnit?.name,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalProductPrice = existingItem.quantity * priceToUse;
      } else {
        state.cart.push({
          ...product,
          quantity,
          totalProductPrice: quantity * priceToUse,
          selectedUnit,
        });
        state.totalQuantity += 1;
      }

      state.totalPrice += quantity * priceToUse;
    },

    removeFromCart(
      state,
      action: PayloadAction<{
        productId: number;
        selectedUnit: { name: string; price: number } | null;
      }>,
    ) {
      const { productId, selectedUnit } = action.payload;
      console.log("check productId", productId);
      console.log("check selectedUnit", selectedUnit);
      const existingItem = state.cart.find(
        (item) =>
          item.id === productId &&
          item.selectedUnit?.name === selectedUnit?.name,
      );

      if (existingItem) {
        const priceToUse =
          existingItem.selectedUnit?.price ?? existingItem.price[0].price ?? 0;

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalProductPrice = existingItem.quantity * priceToUse;
        } else {
          state.cart = state.cart.filter(
            (item) =>
              !(
                item.id === productId &&
                item.selectedUnit?.name === selectedUnit?.name
              ),
          );
          state.totalQuantity -= 1;
        }

        state.totalPrice -= priceToUse;
      }
    },

    updateCartItemUnit(
      state,
      action: PayloadAction<{
        productId: number;
        oldUnitName: string | null;
        newUnit: { name: string; price: number; id: number } | null;
      }>,
    ) {
      const { productId, oldUnitName, newUnit } = action.payload;
      const existingItem = state.cart.find(
        (item) =>
          item.id === productId && item.selectedUnit?.name === oldUnitName,
      );

      if (existingItem) {
        const oldPrice =
          existingItem.selectedUnit?.price ?? existingItem.price[0].price ?? 0;
        const newPrice = newUnit?.price ?? existingItem.price[0].price ?? 0;

        const newUnitItem = state.cart.find(
          (item) =>
            item.id === productId && item.selectedUnit?.name === newUnit?.name,
        );

        if (newUnitItem && newUnit?.name !== oldUnitName) {
          newUnitItem.quantity += existingItem.quantity;
          newUnitItem.totalProductPrice = newUnitItem.quantity * newPrice;
          state.cart = state.cart.filter(
            (item) =>
              !(
                item.id === productId && item.selectedUnit?.name === oldUnitName
              ),
          );
          state.totalQuantity -= 1;
        } else {
          existingItem.selectedUnit = newUnit;
          existingItem.totalProductPrice = existingItem.quantity * newPrice;
        }

        state.totalPrice =
          state.totalPrice -
          existingItem.quantity * oldPrice +
          existingItem.quantity * newPrice;
      }
    },

    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    setCartUser(state, action: PayloadAction<CartUser>) {
      state.cartUser = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemUnit,
  clearCart,
  setCartUser,
} = cartSlice.actions;
export default cartSlice.reducer;
