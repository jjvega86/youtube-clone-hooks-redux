import React from "react";
import { useGetRelatedVideosQuery } from "../../features/youtube/youtubeApi";
import RelatedVideo from "../RelatedVideo/RelatedVideo";

const RelatedVideos = ({ videoId }) => {
  const { data: videos = [] } = useGetRelatedVideosQuery(videoId);
  const renderedVideos = videos.map((video) => {
    if (video.snippet) {
      return (
        <RelatedVideo
          key={video.id.videoId}
          videoId={video.id.videoId}
          thumbnail={video.snippet.thumbnails.default.url}
          title={video.snippet.title}
          description={video.snippet.description}
          channelTitle={video.snippet.channelTitle}
        />
      );
    } else {
      return null;
    }
  });
  return renderedVideos;
};

export default RelatedVideos;
