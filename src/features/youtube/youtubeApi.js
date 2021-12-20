import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey } from "../../app/apiKey";

export const youtubeApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "youtube",
    baseUrl: "https://www.googleapis.com/youtube/v3/",
  }),
  endpoints: (builder) => ({
    getSearchVideos: builder.query({
      query: (searchTerm) =>
        `search?q=${searchTerm}&key=${apiKey}&part=snippet&type=video&maxResults=5`,
      transformResponse: (response, meta, arg) => {
        return {
          videoId: response.items[0].id.videoId,
          title: response.items[0].snippet.title,
          description: response.items[0].snippet.description,
          originalArg: arg,
        };
      },
    }),
    getRelatedVideos: builder.query({
      query: (videoId) =>
        `search?type=video&relatedToVideoId=${videoId}&key=${apiKey}&part=snippet`,
      transformResponse: (response, meta, arg) => {
        return response.items;
      },
    }),
  }),
});

export const { useGetSearchVideosQuery, useGetRelatedVideosQuery } = youtubeApi;
