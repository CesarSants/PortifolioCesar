import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-khaki.vercel.app/api/portifolio'
  }),
  endpoints: (builder) => ({
    getTools: builder.query<Projeto[], void>({
      query: () => 'ferramentas'
    }),
    getWebsites: builder.query<Projeto[], void>({
      query: () => 'websites'
    })
  })
})

export const { useGetToolsQuery, useGetWebsitesQuery } = api

export default api
