import React from "react";

const VideoPlayer = ({ videoId, title, description }) => {
  const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`;
  return (
    <div>
      <div class="ratio ratio-16x9">
        <iframe src={videoURL} frameborder="0" title={title}></iframe>
      </div>
      <p className="display-6 mt-2">{title}</p>
      <p className="lead">{description.substring(0, 100)}...</p>
    </div>
  );
};

export default VideoPlayer;
