"use server";

import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

/**
 * getUserByEmail - 이메일을 이용하여 해당 유저를 찾습니다.
 * @param email - 유저의 이메일
 */
export const getUserByEmail = async (email: string) => {
  if (email?.includes("%40")) email = email.replace(/%40/g, "@");
  const user = await db.user.findFirst({
    where: { email },
  });

  return ResponseData(user, true);
};