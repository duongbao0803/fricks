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
    getListOrder: builder.query({
      query: ({ PageIndex, PageSize, orderStatus, paymentStatus }) => ({
        url: `/orders?PageIndex=${PageIndex}&PageSize=${PageSize}&OrderStatus=${orderStatus}&PaymentStatus=${paymentStatus}`,
        method: "GET",
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

export const {
  useOrderMutation,
  useGetOrderStatusQuery,
  useGetListOrderQuery,
} = orderApi;

export default orderApi;
