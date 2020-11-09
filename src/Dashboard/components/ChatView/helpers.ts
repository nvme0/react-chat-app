export const buildChatDocKey = (users) => users.sort().join(":");

export const textHasContent = (text: string) =>
  text && text.replace(/\s/g, "").length;
