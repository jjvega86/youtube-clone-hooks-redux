import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVideo, selectVideo } from "./features/video/videosSlice";
import { useGetSearchVideosQuery } from "./features/youtubeApi/youtubeApi";

import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos";
import SearchBar from "./components/SearchBar/SearchBar";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";

//TODO: Move Reply API requests to youtubeApi
//TODO: Move PATCH like/dislike functionality to youtubeApi (invalidate tag to refetch comments)
//TODO: Analyze for performance and add enhancements to prevent unnecessary re-renders

const App = () => {
  const [videoSearch, setVideoSearch] = useState("starwars");
  const { data: videoData = {}, isSuccess } =
    useGetSearchVideosQuery(videoSearch);
  const dispatch = useDispatch();
  const video = useSelector(selectVideo);

  useEffect(() => {
    console.log("Re-rendered");
    if (isSuccess) {
      dispatch(
        setVideo({
          videoId: videoData.videoId,
          title: videoData.title,
          description: videoData.description,
        })
      );
    }
  }, [videoData]);

  return (
    <>
      <SearchBar searchForVideo={setVideoSearch} />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-7">
            <VideoPlayer
              videoId={video.videoId}
              title={video.title}
              description={video.description}
            />
            <CommentForm />
            <CommentList videoId={video.videoId} />
          </div>
          <div className="col-lg-4">
            <RelatedVideos videoId={video.videoId} />
          </div>
        </div>
      </div>
      <div className="pb-5"></div>
    </>
  );
};

export default App;
