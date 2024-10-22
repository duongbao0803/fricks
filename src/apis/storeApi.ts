import apiSlice from "./apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreDetail: builder.query({
      query: ({ storeId }) => ({
        url: `/stores/${storeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStoreDetailQuery } = storeApi;

export default storeApi;
