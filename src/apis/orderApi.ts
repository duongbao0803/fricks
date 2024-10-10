import { Page } from "@/types/page.,types";
import apiSlice from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation({
      query: (formData) => ({
        url: "/orders/payment",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useOrderMutation } = orderApi;

export default orderApi;
