import type { PrismaClient, Conversation, Message, User } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;

  export type FullMessageType = Message & {
    sender: User;
    seen: User[];
  };

  export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[];
  };
}
export {};
