import React from "react";

const RelatedVideo = ({
  title,
  thumbnail,
  channelTitle,
  description,
  videoId,
  setVideo,
}) => {
  return (
    <div onClick={() => setVideo({ videoId, title, description })}>
      <img src={`${thumbnail}`} alt="video thumbnail" />
      <p>{title}</p>
      <p>{channelTitle}</p>
    </div>
  );
};

export default RelatedVideo;
