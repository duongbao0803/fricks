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
    getOrderStatus: builder.query({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useOrderMutation, useGetOrderStatusQuery } = orderApi;

export default orderApi;
