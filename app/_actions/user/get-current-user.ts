// no use server -> auth.ts
"use server";
import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";
import { currentUser } from "@/app/_lib/current-user";

/**
 * getCurrentUser - 현재 접속한 유저의 정보를 가져옵니다.
 */
export const getCurrentUser = async () => {
  const cuser = await currentUser();
  const user = await db.user.findFirst({
    where: {
      id: cuser?.id,
    },
    include: {
      Following: true,
      Follower: true,
    },
  });

  return ResponseData(user, true);
};