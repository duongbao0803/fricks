import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  isFavorite: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    incrementFavoriteCount: (state) => {
      state.count += 1;
    },
    decrementFavoriteCount: (state) => {
      state.count -= 1;
    },
    clearFavoriteCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  incrementFavoriteCount,
  decrementFavoriteCount,
  clearFavoriteCount,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
