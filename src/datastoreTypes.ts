export type ContentType = "image/jpeg" | "image/png";

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
