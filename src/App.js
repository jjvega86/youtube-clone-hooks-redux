import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVideo, selectVideo } from "./features/video/videosSlice";
import { useGetSearchVideosQuery } from "./features/youtube/youtubeApi";
import axios from "axios";

import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos";
import SearchBar from "./components/SearchBar/SearchBar";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";

/** Steps to implementing Redux Toolkit
 *  0) Install Redux to project: npm install @reduxjs/toolkit, npm install @react-redux (for React specific hooks that can be used in our project)
 *  1) Create a Redux Store​
 *  2) Provide the Redux Store to React​
 *  3) Create a Redux state "Slice"​
 *  4) Add Slice Reducers to the Store​
 *  5) Use Redux State and Actions in React Components
 */

const App = () => {
  const [currentComments, setCurrentComments] = useState([]);
  const { data: videoData = {}, isSuccess } =
    useGetSearchVideosQuery("starwars");
  const dispatch = useDispatch();
  const video = useSelector(selectVideo);

  useEffect(() => {
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

  useEffect(() => {
    fetchComments(video.videoId);
  }, [video]);

  const fetchComments = async (videoId) => {
    try {
      let response = await axios.get(
        `http://localhost:9001/api/comments/${videoId}`
      );
      setCurrentComments(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postComment = async (commentText) => {
    try {
      await axios.post(`http://localhost:9001/api/comments/`, {
        text: commentText,
        videoId: video.videoId,
      });
      fetchComments(video.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  const searchForVideo = (searchTerm) => {
    /* fetchYouTubeVideos(searchTerm); */
  };

  const refreshComments = () => {
    fetchComments(video.videoId);
  };

  return (
    <>
      <SearchBar searchForVideo={searchForVideo} />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-7">
            <VideoPlayer
              videoId={video.videoId}
              title={video.title}
              description={video.description}
            />
            <CommentForm postComment={postComment} />
            <CommentList
              comments={currentComments}
              getComments={refreshComments}
            />
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
