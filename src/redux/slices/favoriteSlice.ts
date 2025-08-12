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
      state.isFavorite = true;
    },
    decrementFavoriteCount: (state) => {
      state.count -= 1;
      state.isFavorite = false;
    },
    clearFavoriteCount: (state) => {
      state.count = 0;
      state.isFavorite = false;
    },
    setFavoriteCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {
  incrementFavoriteCount,
  decrementFavoriteCount,
  clearFavoriteCount,
  setFavoriteCount,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
