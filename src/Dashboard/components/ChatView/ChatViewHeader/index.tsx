import React from "react";
import { Divider, Typography } from "@material-ui/core";

import { Chat } from "../../../../datastoreTypes";
import useStyles from "./styles";

export interface Props {
  userEmail?: string;
  chat?: Chat;
}

const ChatListHeader = ({ userEmail, chat }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.chatHeader}>
        {chat && (
          <Typography component="span" variant="h6" noWrap>
            {chat.users.filter((user) => user !== userEmail)}
          </Typography>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default ChatListHeader;
