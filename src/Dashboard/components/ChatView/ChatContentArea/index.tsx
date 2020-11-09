import React from "react";

import { Chat } from "../../../../datastoreTypes";
import useStyles from "./styles";

export interface Props {
  userEmail?: string;
  chat: Chat;
  contentRef: React.MutableRefObject<HTMLElement | null>;
}

const ChatContentArea = ({ userEmail, chat, contentRef }: Props) => {
  const classes = useStyles();

  return (
    <main className={classes.content} ref={contentRef}>
      {chat.messages.map((message, index) => (
        <div
          key={index}
          className={
            message.sender === userEmail ? classes.userSent : classes.friendSent
          }
        >
          {message.message}
        </div>
      ))}
    </main>
  );
};

export default ChatContentArea;
