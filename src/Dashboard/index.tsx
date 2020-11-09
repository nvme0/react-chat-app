import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Button, Divider, IconButton, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

import ChatList from "./components/ChatList";
import ChatView from "./components/ChatView";
import useStyles from "./styles";
import { Chat } from "../datastoreTypes";
import { User } from "../hooks/useAuth";

export interface Props {
  user: User;
}

const Dashboard = ({ user }: Props) => {
  const classes = useStyles();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatIndex, setChatIndex] = useState<number | null>(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", user.email)
      .onSnapshot((res) => {
        const chats = res.docs.map((doc) => doc.data()) as Chat[];
        if (chats && user.email) {
          setChats(chats);
        }
      });
  }, [user]);

  const handleNewChatButtonClicked = () => {};

  const handleSelectChat = (index: number) => {
    if (chatIndex === index) {
      setChatIndex(null);
    } else {
      setChatIndex(index);
    }
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <Typography component="span" variant="h6" noWrap>
            Chat
          </Typography>
          <IconButton
            className={classes.newChatButton}
            aria-label="new message"
            onClick={handleNewChatButtonClicked}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Divider style={{ width: "100%" }} />
        <ChatList
          chats={chats}
          selectedChatIndex={chatIndex}
          userEmail={user.email}
          onSelectChat={handleSelectChat}
        />
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      {chatIndex !== null && (
        <ChatView userEmail={user.email} chat={chats[chatIndex]} />
      )}
    </main>
  );
};

export default Dashboard;
