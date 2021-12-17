import React from "react";
import Comment from "../Comment/Comment";

const CommentList = ({ comments, getComments }) => {
  let renderedComments = comments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        commentId={comment._id}
        text={comment.text}
        likes={comment.like}
        dislikes={comment.dislike}
        getComments={getComments}
      />
    );
  });
  return renderedComments;
};

export default CommentList;
