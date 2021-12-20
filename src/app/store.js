import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videosSlice";
import { youtubeApi } from "../features/youtubeApi/youtubeApi";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware),
});
