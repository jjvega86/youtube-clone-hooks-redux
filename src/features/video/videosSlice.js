import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoId: "Oa0pMn0tvU4",
  title: "LOADING",
  description: "LOADING",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.videoId = action.payload.videoId;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
  },
});

export const selectVideo = (state) => state.video;
export const { setVideo } = videoSlice.actions;
export default videoSlice.reducer;
