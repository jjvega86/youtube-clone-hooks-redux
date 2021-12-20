import React from "react";
import Comment from "../Comment/Comment";
import { useGetCommentsQuery } from "../../features/youtubeApi/youtubeApi";

const CommentList = ({ videoId }) => {
  const {
    data: comments,
    isFetching,
    isSuccess,
  } = useGetCommentsQuery(videoId);
  let renderedComments;

  if (isFetching) {
    renderedComments = <div>Loading...</div>;
  } else if (isSuccess) {
    renderedComments = comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          commentId={comment._id}
          text={comment.text}
          likes={comment.like}
          dislikes={comment.dislike}
        />
      );
    });
  }

  return renderedComments;
};

export default CommentList;
