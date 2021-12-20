import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectVideo } from "../../features/video/videosSlice";
import { useAddCommentMutation } from "../../features/youtubeApi/youtubeApi";

const CommentForm = () => {
  const [text, setText] = useState("");
  const [addComment] = useAddCommentMutation();
  const video = useSelector(selectVideo);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({
      text,
      videoId: video.videoId,
    });
    setText("");
  };

  return (
    <form className="row mb-5 mt-4" onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label for="commentText" className="form-label lead">
          Add Comment
        </label>
      </div>
      <div className="col-md-6">
        <input
          style={{ maxWidth: "300px" }}
          name="text"
          id="commentText"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
};

export default CommentForm;
