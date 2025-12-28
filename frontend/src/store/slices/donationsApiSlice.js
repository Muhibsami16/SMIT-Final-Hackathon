import { apiSlice } from './apiSlice';

const DONATIONS_URL = '/donations';

export const donationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDonation: builder.mutation({
            query: (data) => ({
                url: DONATIONS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Donation', 'Campaign'],
        }),
        getAllDonations: builder.query({
            query: (params) => ({
                url: DONATIONS_URL,
                params,
            }),
            providesTags: ['Donation'],
            keepUnusedDataFor: 5,
        }),
        getMyDonations: builder.query({
            query: () => ({
                url: `${DONATIONS_URL}/my`,
            }),
            providesTags: ['Donation'],
            keepUnusedDataFor: 5,
        }),
        verifyDonation: builder.mutation({
            query: (donationId) => ({
                url: `${DONATIONS_URL}/${donationId}/verify`,
                method: 'PUT',
            }),
            invalidatesTags: ['Donation', 'Campaign'],
        }),
    }),
});

export const {
    useCreateDonationMutation,
    useGetAllDonationsQuery,
    useGetMyDonationsQuery,
    useVerifyDonationMutation,
} = donationsApiSlice;
