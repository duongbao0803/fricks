import apiSlice from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => "/users",
    }),

    deleteUser: builder.mutation({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }: { userId: number; userData: any }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetUserListQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;

export default userApi;
