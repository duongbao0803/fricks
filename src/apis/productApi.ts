import apiSlice from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({ categoryId }) => `/products?categoryId=${categoryId}`,
    }),
  }),
});

export const { useGetProductListQuery } = productApi;

export default productApi;
