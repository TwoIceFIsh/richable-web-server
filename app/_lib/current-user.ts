"use server";
import { auth } from "@/auth";

/**
 * currentUser - 현재 사용자를 가져옵니다.
 * */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};