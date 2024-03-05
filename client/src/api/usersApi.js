import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const baseUrl = 'https://da1c-182-185-213-134.ngrok-free.app';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users/',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({id, ...user}) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
