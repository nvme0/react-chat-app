import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";

import useStyles from "./styles";

export interface Props {
  onSubmitMessage: (message: string) => void;
}

export const ChatTextBox = ({ onSubmitMessage }: Props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const clearMessage = () => setMessage("");

  const handleOnSubmitMessage = () => {
    onSubmitMessage(message);
    clearMessage();
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmitMessage();
    }
  };

  const handleOnChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(value);
  };

  const handleOnFocus = () => console.log("OnFocus");

  return (
    <div className={classes.chatTextBoxContainer}>
      <TextField
        className={classes.chatTextBox}
        variant="outlined"
        placeholder="Type a new message"
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        value={message}
        multiline
        rowsMax={12}
      />
      <div className={classes.chatTextActions}>
        <IconButton
          aria-label="send"
          className={classes.sendButton}
          onClick={handleOnSubmitMessage}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatTextBox;
