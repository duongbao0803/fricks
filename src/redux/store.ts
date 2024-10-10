import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import authApi from "@/apis/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "cart"],
};

const rootReducer = {
  favorites: favoriteReducer,
  cart: cartReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
