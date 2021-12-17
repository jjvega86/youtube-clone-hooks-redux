import React, { useState } from "react";

const ReplyForm = ({ postReply }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postReply(text);
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
