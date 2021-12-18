import React from "react";

import { useDispatch } from "react-redux";
import { setVideo } from "../../features/video/videosSlice";

const RelatedVideo = ({ title, thumbnail, description, videoId }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setVideo({ videoId, title, description }))}
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
