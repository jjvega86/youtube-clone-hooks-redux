import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey } from "../../app/apiKey";

export const youtubeApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "youtube",
    baseUrl: "https://www.googleapis.com/youtube/v3/search?",
  }),
  endpoints: (builder) => ({
    getSearchVideos: builder.query({
      query: (searchTerm) =>
        `q=${searchTerm}&key=${apiKey}&part=snippet&type=video&maxResults=5`,
    }),
  }),
});

export const { useGetSearchVideosQuery } = youtubeApi;
