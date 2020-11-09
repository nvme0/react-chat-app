import React, { useEffect, useRef } from "react";
import firebase from "firebase";

import { Chat } from "../../../datastoreTypes";
import ChatTextBox from "./ChatTextBox";
import useStyles from "./styles";
import ChatViewHeader from "./ChatViewHeader";
import ChatContentArea from "./ChatContentArea";
import { buildChatDocKey, textHasContent } from "./helpers";

export interface Props {
  userEmail: string;
  chat: Chat;
}

const ChatView = ({ userEmail, chat }: Props) => {
  const classes = useStyles();
  const chatDocKey = chat ? buildChatDocKey(chat.users) : undefined;
  const contentRef = useRef<HTMLElement | null>(null);

  const contentScrollToBottom = () => {
    if (contentRef && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      contentRef.current.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    contentScrollToBottom();
  }, []);

  useEffect(() => {
    if (chat.messages.length) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      if (lastMessage.sender === userEmail) {
        contentScrollToBottom();
      }
    }
  }, [chat.messages]);

  const handleOnSubmitMessage = (message: string) => {
    if (textHasContent(message)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(chatDocKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            sender: userEmail,
            message,
            timestamp: Date.now()
          }),
          receiverHasRead: false
        });
    }
  };

  return (
    <div className={classes.container}>
      <ChatViewHeader userEmail={userEmail} chat={chat} />
      <ChatContentArea
        userEmail={userEmail}
        chat={chat}
        contentRef={contentRef}
      />
      <ChatTextBox onSubmitMessage={handleOnSubmitMessage} />
    </div>
  );
};

export default ChatView;
