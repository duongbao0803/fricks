import { Page } from "@/types/page.,types";
import apiSlice from "./apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ PageIndex, PageSize }: Page) => ({
        url: `/posts?PageIndex=${PageIndex}&PageSize=${PageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostListQuery } = postApi;

export default postApi;
