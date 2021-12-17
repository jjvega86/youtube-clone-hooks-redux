import React, { useState, useEffect } from "react";
import axios from "axios";

import { apiKey } from "./apiKey";

import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos";
import SearchBar from "./components/SearchBar/SearchBar";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";

//TODO: Create Redux store, provide Redux store to React
//TODO: Gameplan first slice (move currentVideo useState from App to slice, then refactor to dispatch actions as needed)

/** Steps to implementing Redux Toolkit
 *  0) Install Redux to project: npm install @reduxjs/toolkit, npm install @react-redux (for React specific hooks that can be used in our project)
 *  1) Create a Redux Store​
 *  2) Provide the Redux Store to React​
 *  3) Create a Redux state "Slice"​
 *  4) Add Slice Reducers to the Store​
 *  5) Use Redux State and Actions in React Components
 */

const App = () => {
  const [currentVideo, setCurrentVideo] = useState({
    id: {
      videoId: "Oa0pMn0tvU4",
    },
    snippet: {
      title: "LOADING",
      description: "LOADING",
    },
  });
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [currentComments, setCurrentComments] = useState([]);

  useEffect(() => {
    fetchYouTubeVideos("starwars");
  }, []);

  useEffect(() => {
    fetchRelatedVideos(currentVideo.id.videoId);
    fetchComments(currentVideo.id.videoId);
  }, [currentVideo]);

  const fetchYouTubeVideos = async (searchTerm) => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${apiKey}&part=snippet&type=video&maxResults=5`
      );
      setCurrentVideo(response.data.items[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchRelatedVideos = async (videoId) => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=${videoId}&key=${apiKey}&part=snippet`
      );
      setRelatedVideos(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

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
        videoId: currentVideo.id.videoId,
      });
      fetchComments(currentVideo.id.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  const searchForVideo = (searchTerm) => {
    fetchYouTubeVideos(searchTerm);
  };

  const changeSelectedVideo = (videoData) => {
    let video = {
      id: {
        videoId: videoData.videoId,
      },
      snippet: {
        title: videoData.title,
        description: videoData.description,
      },
    };
    setCurrentVideo(video);
  };

  const refreshComments = () => {
    fetchComments(currentVideo.id.videoId);
  };

  return (
    <>
      <SearchBar searchForVideo={searchForVideo} />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-7">
            <VideoPlayer
              videoId={currentVideo.id.videoId}
              title={currentVideo.snippet.title}
              description={currentVideo.snippet.description}
            />
            <CommentForm postComment={postComment} />
            <CommentList
              comments={currentComments}
              getComments={refreshComments}
            />
          </div>
          <div className="col-lg-4">
            <RelatedVideos
              videos={relatedVideos}
              setVideo={changeSelectedVideo}
            />
          </div>
        </div>
      </div>
      <div className="pb-5"></div>
    </>
  );
};

export default App;
