import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useState
} from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { IconButton, TextField } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";

import useStyles from "./styles";

export interface Props {
  onSubmitMessage: (message: string, contentType?: string) => void;
  onUploadFiles: (files: File[]) => void;
}

export const ChatTextBox = ({ onSubmitMessage, onUploadFiles }: Props) => {
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

  const onDrop = useCallback((files: File[]) => {
    onUploadFiles(files);
  }, []);
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classes.chatTextBoxContainer}>
      <div {...getRootProps()}>
        <TextField
          className={classNames(
            classes.chatTextBox,
            isDragActive ? "drag-active" : ""
          )}
          variant="outlined"
          placeholder="Type a new message"
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          value={isDragActive ? "Drop your files here" : message}
          multiline
          rowsMax={12}
        />
      </div>
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
