// source: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
export type ContentTypeImage =
  | "image/apng"
  | "image/avif"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/webp"
  | "image/bmp"
  | "image/x-icon"
  | "image/tiff";

// source: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers
export type ContentTypeVideo =
  | "video/3gpp"
  | "video/3gpp2"
  | "video/3gp2"
  | "video/mpeg"
  | "video/mp4"
  | "video/ogg"
  | "video/quicktime"
  | "video/webm";
export type ContentTypeAudio =
  | "audio/3gpp"
  | "audio/3gpp2"
  | "audio/3gp2"
  | "audio/aac"
  | "audio/mpeg"
  | "audio/flac"
  | "audio/x-flac"
  | "audio/mp4"
  | "audio/ogg"
  | "audio/wave"
  | "audio/wav"
  | "audio/x-wav"
  | "audio/x-pn-wav"
  | "audio/webm";

export type ContentType = ContentTypeImage | ContentTypeVideo;

export interface Message {
  sender: string;
  content: string;
  contentType?: ContentType;
  timestamp: number;
}

export interface Chat {
  messages: Message[];
  receiverHasRead: boolean;
  users: string[];
}
