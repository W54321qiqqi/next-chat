import getConversations from "../actions/getConversations";
import Sidebar from "../components/Sidebar/Sidebar";
import useConversation from "../hooks/useConversation";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    // @ts-expect-error 服务端组件
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations}></ConversationList>
        {children}
      </div>
    </Sidebar>
  );
}
