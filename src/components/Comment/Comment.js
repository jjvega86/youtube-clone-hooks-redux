import React, { useState, useEffect } from "react";
import ReplyList from "../ReplyList/ReplyList";
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";

const Comment = ({ commentId, text, likes, dislikes }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetchReplies();
  }, []);

  const fetchReplies = async () => {
    try {
      let response = await axios.get(
        `http://localhost:9001/api/comments/${commentId}/replies/`
      );
      setReplies(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postReply = async (replyText) => {
    try {
      await axios.post(
        `http://localhost:9001/api/comments/${commentId}/reply/`,
        { text: replyText }
      );
      fetchReplies();
    } catch (error) {
      console.log(error.message);
    }
  };

  const applyLike = async () => {
    try {
      await axios.patch(`http://localhost:9001/api/comments/${commentId}/like`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const applyDislike = async () => {
    try {
      await axios.patch(
        `http://localhost:9001/api/comments/${commentId}/dislike`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card w-75 mt-3 border-0">
      <div className="card-body lead">
        <h5 class="card-title">User</h5>
        <div className="card-text">{text} </div>
        <footer>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={applyLike}
          >
            👍 &nbsp;&nbsp;<span className="badge bg-secondary">{likes}</span>{" "}
          </button>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={applyDislike}
          >
            👎 &nbsp;&nbsp;
            <span className="badge bg-secondary">{dislikes}</span>{" "}
          </button>
        </footer>
      </div>
      <div className="mt-2" style={{ paddingLeft: "5vh" }}>
        <ReplyList replies={replies} />
        <ReplyForm postReply={postReply} />
      </div>
    </div>
  );
};

export default Comment;
