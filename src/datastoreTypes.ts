export interface Chat {
  messages: { sender: string; message: string }[];
  receiverHasRead: boolean;
  users: string[];
}
