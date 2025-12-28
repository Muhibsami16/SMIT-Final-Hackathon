import { apiSlice } from './apiSlice';

const ADMIN_URL = '/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminStats: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/stats`,
            }),
            providesTags: ['Donation', 'Campaign', 'User'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetAdminStatsQuery } = adminApiSlice;
