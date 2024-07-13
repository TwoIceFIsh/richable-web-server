"use server";

import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

/**
 * getUserById - id를 이용하여 해당 유저를 찾습니다.
 * @param id - 유저의 id
 */
export const getUserAllByUserId = async (id: string) => {
  const user = await db.user.findFirst({
    where: { id },
  });

  return ResponseData(user, true);
};