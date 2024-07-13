import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  verifyPrefix,
} from "@/route";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/app/_lib/current-user";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth(async (req) => {
  const user = await currentUser();
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isVerifyRoute = nextUrl.pathname.startsWith(verifyPrefix);

  // pass
  if (isApiAuthRoute) {
    return null;
  }

  // pass
  if (isVerifyRoute) return null;

  // Redirect to home page if user is logged in and trying to access the login pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // 미 로그인 시 다음의 화면으로 이동 시킨다.
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth", nextUrl));
  }

  // 로그인한 대상의 역할이 유저이며 관리자 페이지 접근 시 아무 반응을 하지 않습니다.
  if (isLoggedIn)
    if (user?.role === UserRole.USER && isAdminRoute) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

  // 아무런 작업을 하지 않고 허용 합니다.
  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};