import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const axiosBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const token = Cookies.get("accessToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const config = await fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   const refreshToken = Cookies.get('refreshToken');
  //   if (refreshToken) {
  //     const refreshResult = await fetchBaseQuery({
  //       baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  //     })('/refresh-token', {
  //       method: 'POST',
  //       body: { refreshToken },
  //     });

  //     if (refreshResult.data) {
  //       const newAccessToken = refreshResult.data['access-token'];
  //       Cookies.set('accessToken', newAccessToken);
  //       return await fetchBaseQuery({
  //         baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  //         prepareHeaders: (headers) => {
  //           headers.set('Authorization', `Bearer ${newAccessToken}`);
  //           return headers;
  //         },
  //       })(args, api, extraOptions);
  //     }
  //   }
  // }

  return config;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});

export default apiSlice;
