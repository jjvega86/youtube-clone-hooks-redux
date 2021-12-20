import React, { useState } from "react";
import { useAddReplyMutation } from "../../features/youtubeApi/youtubeApi";

const ReplyForm = ({ commentId }) => {
  const [text, setText] = useState("");
  const [addReply] = useAddReplyMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addReply({ commentId, text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="pb-5">
      <input
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default ReplyForm;
