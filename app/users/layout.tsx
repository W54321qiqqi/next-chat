import Sidebar from "@/app/components/Sidebar/Sidebar";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error 服务端组件
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
