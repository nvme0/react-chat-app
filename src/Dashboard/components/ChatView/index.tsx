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

  const handleOnSubmitMessage = (content: string, contentType?: string) => {
    if (textHasContent(content)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(chatDocKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            sender: userEmail,
            content,
            contentType,
            timestamp: Date.now()
          }),
          receiverHasRead: false
        });
    }
  };

  const handleOnUploadFileProgress = (
    snapshot: firebase.storage.UploadTaskSnapshot
  ) => {
    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log({ percentage });
  };

  const handleOnUploadFileError = (
    error: firebase.storage.FirebaseStorageError
  ) => {};

  const handleOnUploadFiles = (files: File[]) => {
    files.forEach((file) => {
      const storagePath = `users/${userEmail}/${file.name}`;
      const storageRef = firebase.storage().ref(storagePath);
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        handleOnUploadFileProgress,
        handleOnUploadFileError,
        () => {}
      );
      task.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          handleOnSubmitMessage(downloadUrl, file.type);
        });
      });
    });
  };

  return (
    <div className={classes.container}>
      <ChatViewHeader userEmail={userEmail} chat={chat} />
      <ChatContentArea
        userEmail={userEmail}
        chat={chat}
        contentRef={contentRef}
      />
      <ChatTextBox
        onSubmitMessage={handleOnSubmitMessage}
        onUploadFiles={handleOnUploadFiles}
      />
    </div>
  );
};

export default ChatView;
