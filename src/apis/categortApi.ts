import apiSlice from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatagory: builder.query({
      query: () => "/categories/get-all-category",
    }),
  }),
});

export const { useGetAllCatagoryQuery } = categoryApi;

export default categoryApi;
