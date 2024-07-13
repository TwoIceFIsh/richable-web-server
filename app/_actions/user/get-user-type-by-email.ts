"use server";

import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";
import { UserType } from "@/app/_type/user-type";

/**
 * getUserTypeByEmail - 이메일을 이용하여 해당 유저의 정보를 가져옵니다.
 * @param email - 유저의 이메일
 */
export const getUserTypeByEmail = async (email: string) => {
  if (email?.includes("%40")) email = email.replace(/%40/g, "@");
  const user = await db.user.findFirst({
    where: { email },
  });

  const data = {
    id: user?.id,
    email: user?.email,
    name: user?.name,
    content: user?.content,
    image: user?.image,
  } as UserType;

  return ResponseData(data, true);
};