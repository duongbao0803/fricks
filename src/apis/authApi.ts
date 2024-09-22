import apiSlice from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/authen/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (information) => ({
        url: "/authen/register",
        method: "POST",
        body: information,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} = authApi;

export default authApi;
