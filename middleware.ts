import { withAuth } from "next-auth/middleware";
// 权限中间件  root 加入白名单
export default withAuth({
  pages: {
    signIn: "/",
  },
});
// 鉴权以下路由
export const config = {
  matcher: ["/users/:path*"],
};
