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
    <div
      onClick={() => setVideo({ videoId, title, description })}
      className="container mt-5"
    >
      <div className="row">
        <div className="col-md-3">
          <img src={`${thumbnail}`} alt="video thumbnail" />
        </div>
        <div className="col-md-9 font-weight-light">
          <p>{title}</p>
        </div>
      </div>
      <div class="dropdown-divider mt-3"></div>
    </div>
  );
};

export default RelatedVideo;
