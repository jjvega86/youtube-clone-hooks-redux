import React from "react";
import ReplyList from "../ReplyList/ReplyList";
import ReplyForm from "../ReplyForm/ReplyForm";

import {
  useAddLikeMutation,
  useAddDisLikeMutation,
  useGetRepliesQuery,
} from "../../features/youtubeApi/youtubeApi";

const Comment = ({ commentId, text, likes, dislikes }) => {
  const { data: replies = [] } = useGetRepliesQuery(commentId);
  const [addLike] = useAddLikeMutation();
  const [addDisLike] = useAddDisLikeMutation();

  return (
    <div className="card w-75 mt-3 border-0">
      <div className="card-body lead">
        <h5 class="card-title">User</h5>
        <div className="card-text">{text} </div>
        <footer>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => addLike(commentId)}
          >
            👍 &nbsp;&nbsp;<span className="badge bg-secondary">{likes}</span>{" "}
          </button>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => addDisLike(commentId)}
          >
            👎 &nbsp;&nbsp;
            <span className="badge bg-secondary">{dislikes}</span>{" "}
          </button>
        </footer>
      </div>
      <div className="mt-2" style={{ paddingLeft: "5vh" }}>
        <ReplyList replies={replies} />
        <ReplyForm commentId={commentId} />
      </div>
    </div>
  );
};

export default Comment;
