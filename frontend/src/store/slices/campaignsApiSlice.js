import { apiSlice } from './apiSlice';

const CAMPAIGNS_URL = '/campaigns';

export const campaignsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCampaigns: builder.query({
            query: () => ({
                url: CAMPAIGNS_URL,
            }),
            providesTags: ['Campaign'],
            keepUnusedDataFor: 5,
        }),
        getCampaignDetails: builder.query({
            query: (campaignId) => ({
                url: `${CAMPAIGNS_URL}/${campaignId}`,
            }),
            providesTags: ['Campaign'],
            keepUnusedDataFor: 5,
        }),
        createCampaign: builder.mutation({
            query: (data) => ({
                url: CAMPAIGNS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Campaign'],
        }),
        updateCampaign: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${CAMPAIGNS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Campaign'],
        }),
        deleteCampaign: builder.mutation({
            query: (id) => ({
                url: `${CAMPAIGNS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Campaign'],
        }),
    }),
});

export const {
    useGetCampaignsQuery,
    useGetCampaignDetailsQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,
} = campaignsApiSlice;
