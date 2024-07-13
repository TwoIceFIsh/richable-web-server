"use server";

/**
 * signOutBasic - 로그아웃하고 /auth로 리다이렉트합니다.
 * */
import { signOut } from "@/auth";

export const signOutBasic = async () => {
  await signOut({
    redirectTo: "/auth",
    redirect: true,
  });
};