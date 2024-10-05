import apiSlice from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({ PageIndex, PageSize, CategoryId, name, MinPrice, MaxPrice }) =>
        `/products?PageIndex=${PageIndex}&PageSize=${PageSize}&CategoryId=${CategoryId}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}&Search=${name}`,
    }),
  }),
});

export const { useGetProductListQuery } = productApi;

export default productApi;
