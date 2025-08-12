import {
  CreateFeedBackReq,
  GetFeedBack,
  UpdateFeedBackReq,
} from "@/types/feedBack.types";
import apiSlice from "./apiSlice";

const feedBacksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBacksList: builder.query({
      query: ({ PageIndex, PageSize, productId }: GetFeedBack) => ({
        url: `/feedbacks/product/${productId}?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
        method: "GET",
      }),
    }),
    createFeedback: builder.mutation({
      query: (payload: CreateFeedBackReq) => ({
        url: `/feedbacks`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (productId: number) => ({
        url: `/feedbacks/${productId}`,
        method: "DELETE",
      }),
    }),
    updateFeedback: builder.mutation({
      query: (payload: UpdateFeedBackReq) => ({
        url: `/feedbacks`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetFeedBacksListQuery,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
} = feedBacksApi;

export default feedBacksApi;
