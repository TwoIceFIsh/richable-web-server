"use server";
import { auth } from "@/auth";

/**
 * currentRole - 현재 사용자의 역할을 가져옵니다.
 * */
export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
};