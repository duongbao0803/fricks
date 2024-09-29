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
    loginGoogle: builder.mutation({
      query: (credentials) => ({
        url: "/authen/login-with-google",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    confirmEmail: builder.mutation({
      query: (information) => ({
        url: "/authen/email-confirm",
        method: "POST",
        body: information,
      }),
    }),
    getUserInfo: builder.mutation({
      query: () => ({
        url: "/authen/current-user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useLoginGoogleMutation,
  useConfirmEmailMutation,
  useGetUserInfoMutation,
} = authApi;

export default authApi;
