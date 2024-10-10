import apiSlice from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({
        PageIndex,
        PageSize,
        CategoryId,
        name,
        MinPrice,
        MaxPrice,
      }) => ({
        url: `/products?PageIndex=${PageIndex}&PageSize=${PageSize}&CategoryId=${CategoryId}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}&Search=${name}`,
        method: "GET",
      }),
    }),
    getDetailProduct: builder.query({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductListQuery, useGetDetailProductQuery } = productApi;

export default productApi;
