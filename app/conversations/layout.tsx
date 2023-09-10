import getConversations from "../actions/getConversations";
import Sidebar from "../components/Sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error 服务端组件
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
          users={users}
        ></ConversationList>
        {children}
      </div>
    </Sidebar>
  );
}
