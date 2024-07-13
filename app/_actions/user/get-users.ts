"use server";

import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

/**
 * getUsers - 모든 유저의 정보를 가져옵니다.
 */
export const getUsers = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
      content: true,
      isActivated: true,
      role: true,
    },
  });

  return ResponseData(users, true);
};