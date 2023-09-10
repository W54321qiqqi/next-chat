import DesktopSidebar from "@/app/components/Sidebar/DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";
const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  // 获取当前用户信息  通过superJson处理Date、function 丢失问题，
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <MobileFooter />
      <DesktopSidebar currentUser={currentUser!}></DesktopSidebar>
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
