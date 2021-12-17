import React from "react";
import Reply from "../Reply/Reply";

const ReplyList = ({ replies }) => {
  let renderedReplies = replies.map((reply) => {
    return <Reply key={reply._id} text={reply.text} />;
  });
  return <div>{renderedReplies}</div>;
};

export default ReplyList;
