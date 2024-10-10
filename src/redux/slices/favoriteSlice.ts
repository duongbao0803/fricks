import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
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
  },
});

export const { incrementFavoriteCount, decrementFavoriteCount } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
