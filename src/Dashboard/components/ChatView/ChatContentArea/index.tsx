import { Typography } from "@material-ui/core";
import React from "react";

import { Chat } from "../../../../datastoreTypes";
import ChatMessage from "./ChatMessage";
import useStyles from "./styles";

export interface Props {
  userEmail?: string;
  chat: Chat;
  contentRef: React.MutableRefObject<HTMLElement | null>;
}

const formatTimestamp = (timestamp: number) => {
  const now = new Date();
  const dateTimestamp = new Date(timestamp);
  const sameYear = now.getFullYear() === dateTimestamp.getFullYear();
  const sameDay =
    sameYear &&
    now.getMonth() === dateTimestamp.getMonth() &&
    now.getDate() === dateTimestamp.getDate();

  const options = {
    year: !sameYear ? "2-digit" : undefined,
    month: !sameDay ? "numeric" : undefined,
    day: !sameDay ? "numeric" : undefined,
    hour: "numeric",
    minute: "numeric"
  };

  return new Intl.DateTimeFormat("en", options).format(dateTimestamp);
};

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
          <div className={classes.flexColumn}>
            <div className={classes.flexJustifyContentSpaceBetween}>
              {message.sender !== userEmail && (
                <Typography
                  component="small"
                  variant="caption"
                  className={classes.senderText}
                >
                  {message.sender}
                </Typography>
              )}
              <Typography component="small" variant="caption">
                {formatTimestamp(message.timestamp)}
              </Typography>
            </div>
            <ChatMessage {...message} />
          </div>
        </div>
      ))}
    </main>
  );
};

export default ChatContentArea;
