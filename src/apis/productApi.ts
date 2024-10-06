import apiSlice from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({ PageIndex, PageSize, CategoryId, name, MinPrice, MaxPrice }) =>
        `/products?PageIndex=${PageIndex}&PageSize=${PageSize}&CategoryId=${CategoryId}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}&Search=${name}`,
    }),
    getDetailProduct: builder.query({
      query: ({ productId }) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductListQuery, useGetDetailProductQuery } = productApi;

export default productApi;
