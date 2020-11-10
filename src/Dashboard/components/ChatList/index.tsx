import React from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import { NotificationImportant } from "@material-ui/icons";

import useStyles from "./styles";
import { Chat } from "../../../datastoreTypes";

export interface Props {
  chats: Chat[];
  selectedChatIndex: number | null;
  userEmail: string;
  onSelectChat: (chatIndex: number) => void;
}

const ChatList = ({
  chats,
  selectedChatIndex,
  userEmail,
  onSelectChat
}: Props) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {chats.map(({ users, messages }, index) => (
        <div key={index}>
          <ListItem
            className={classes.listItem}
            onClick={() => onSelectChat(index)}
            selected={index === selectedChatIndex}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Avatar">
                {users
                  .filter((user) => user !== userEmail)[0]
                  .split("")[0]
                  .toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={users.filter((user) => user !== userEmail)[0]}
              secondary={
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    noWrap
                  >
                    {messages.length
                      ? messages[messages.length - 1].content
                      : ""}
                  </Typography>
                </span>
              }
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default ChatList;
