import React from "react";
import { Message } from "../../../../../datastoreTypes";

const ChatMessage = ({ content, contentType }: Message) => {
  switch (contentType) {
    case "image/jpeg":
    case "image/png":
      return (
        <img src={content} style={{ maxHeight: "180px" }} loading="lazy" />
      );

    default:
      return <>{content}</>;
  }
};

export default ChatMessage;
