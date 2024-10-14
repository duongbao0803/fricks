import { url } from "inspector";
import apiSlice from "./apiSlice";
import { Page } from "@/types/page.,types";

const favoriteProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorList: builder.query({
      query: ({ PageIndex, PageSize }) => ({
        url: `/favorites/user?PageIndex=${PageIndex}&PageSize=${PageSize}`,
        method: "GET",
      }),
    }),
    addFavorite: builder.mutation({
      query: (productId) => ({
        url: "/favorites",
        method: "POST",
        body: productId,
      }),
    }),
    deleteFavorite: builder.mutation({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: "DELETE",
      }),
    }),
    deleteFavoriteAll: builder.mutation({
      query: () => ({
        url: "favorites/all",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFavorListQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useDeleteFavoriteAllMutation,
} = favoriteProductApi;

export default favoriteProductApi;
