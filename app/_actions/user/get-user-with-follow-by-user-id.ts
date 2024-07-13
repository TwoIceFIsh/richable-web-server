// no use server -> auth.ts
"use server";
import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

/**
 * getUserWithFollowById - id를 이용하여 해당 유저의 정보를 가져옵니다.
 * @param id - 유저의 id
 */
export const getUserWithFollowById = async (id: string | undefined) => {
  const user = await db.user.findFirst({
    where: {
      id: id,
    },
    include: {
      Following: true,
      Follower: true,
    },
  });

  return ResponseData(user, true);
};