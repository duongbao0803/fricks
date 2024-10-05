import apiSlice from "./apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ PageIndex, PageSize }) =>
        `/posts?PageIndex=${PageIndex}&PageSize=${PageSize}`,
    }),
  }),
});

export const { useGetPostListQuery } = postApi;

export default postApi;
