import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'register/',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchReviews: builder.query({
        query: (page = 1) => `reviews/?page=${page}`,
    }),
    submitReview: builder.mutation({
      query: (review) => ({
        url: 'reviews/',
        method: 'POST',
        body: review,
      }),
    }),
    fetchStatistics: builder.query({
      query: () => 'statistics/',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchReviewsQuery,
  useSubmitReviewMutation,
  useFetchStatisticsQuery,
} = apiSlice;
