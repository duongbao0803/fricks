import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteProducts: number[];
}

const initialState: FavoriteState = {
  favoriteProducts: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favoriteProducts.indexOf(action.payload);
      if (index >= 0) {
        state.favoriteProducts.splice(index, 1);
      } else {
        state.favoriteProducts.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
