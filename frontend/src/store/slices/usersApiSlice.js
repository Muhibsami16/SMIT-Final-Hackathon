import { apiSlice } from './apiSlice';

const USERS_URL = '/auth';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        profile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            }),
            keepUnusedDataFor: 5,
        }),
        getUsers: builder.query({
            query: (keyword) => ({
                url: `${USERS_URL}/users`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useGetUsersQuery,
} = usersApiSlice;
