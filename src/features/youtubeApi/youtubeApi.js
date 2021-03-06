import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey } from "../../app/apiKey";

export const youtubeApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "youtube",
    baseUrl: "https://www.googleapis.com/youtube/v3/",
  }),
  tagTypes: ["Comments", "Replies"],
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
    getComments: builder.query({
      query: (videoId) => ({
        url: `http://localhost:9001/api/comments/${videoId}`,
      }),
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: `http://localhost:9001/api/comments/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Comments"],
    }),
    addLike: builder.mutation({
      query: (commentId) => ({
        url: `http://localhost:9001/api/comments/${commentId}/like`,
        method: `PATCH`,
      }),
      invalidatesTags: ["Comments"],
    }),
    addDisLike: builder.mutation({
      query: (commentId) => ({
        url: `http://localhost:9001/api/comments/${commentId}/dislike`,
        method: `PATCH`,
      }),
      invalidatesTags: ["Comments"],
    }),
    getReplies: builder.query({
      query: (commentId) => ({
        url: `http://localhost:9001/api/comments/${commentId}/replies/`,
      }),
      providesTags: ["Replies"],
    }),
    addReply: builder.mutation({
      query: ({ commentId, text }) => ({
        url: `http://localhost:9001/api/comments/${commentId}/reply/`,
        method: `POST`,
        body: { text },
      }),
      invalidatesTags: ["Replies"],
    }),
  }),
});

export const {
  useGetSearchVideosQuery,
  useGetRelatedVideosQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useAddLikeMutation,
  useAddDisLikeMutation,
  useGetRepliesQuery,
  useAddReplyMutation,
} = youtubeApi;
