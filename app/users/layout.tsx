import Sidebar from "@/app/components/Sidebar/Sidebar";
import UserList from "./components/UserList";
import getUsers from "../actions/getUsers";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    // @ts-expect-error 服务端组件
    <Sidebar>
      <div className="h-full">
        <UserList items={users}></UserList>
        {children}
      </div>
    </Sidebar>
  );
}
