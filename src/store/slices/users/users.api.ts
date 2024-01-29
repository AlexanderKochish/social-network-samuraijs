import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (builder) => ({
    // Get all users, current page and count
    getAllUsers: builder.query({
      query: ({ page, count }) => ({
        url: `users?page=${page}&count=${count}`,
        headers: {
          "API-KEY": `${import.meta.env.VITE_API_KEY}`,
        },
      }),
    }),
    // Search user by nikname
    searchUser: builder.query({
      query: (searchString) => ({
        url: `users?term=${searchString}`,
        headers: {
          "API-KEY": `${import.meta.env.VITE_API_KEY}`,
        },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useSearchUserQuery } = usersApi;
