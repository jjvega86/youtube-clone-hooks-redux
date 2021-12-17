import React, { useState } from "react";

const CommentForm = ({ postComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(text);
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
