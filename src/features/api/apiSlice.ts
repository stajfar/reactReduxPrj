import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',// this is optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/3500' }),
    tagTypes: ['post'],
    endpoints: builder => ({})

});