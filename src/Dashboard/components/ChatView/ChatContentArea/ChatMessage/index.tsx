import React from "react";
import ReactPlayer from "react-player";

import { Message } from "../../../../../datastoreTypes";
import useStyles from "./styles";

const ChatMessage = ({ content, contentType }: Message) => {
  const classes = useStyles();

  switch (contentType) {
    case "image/apng":
    case "image/avif":
    case "image/gif":
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/webp":
    case "image/bmp":
    case "image/x-icon":
    case "image/tiff":
      return <img src={content} className={classes.image} loading="lazy" />;

    case "video/3gpp":
    case "video/3gpp2":
    case "video/3gp2":
    case "video/mpeg":
    case "video/mp4":
    case "video/ogg":
    case "video/quicktime":
    case "video/webm":
      return (
        <div className={classes.videoPlayerContainer}>
          <ReactPlayer url={content} controls light />
        </div>
      );

    default:
      return <>{content}</>;
  }
};

export default ChatMessage;
