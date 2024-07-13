"use server";

import db from "@/lib/db";

/**
 * checkEmailAsBoolean - 이메일이 있는지 확인합니다.
 *
 * @param email - 이메일
 * */
export const checkEmailAsBoolean = async (email: string) => {
  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  return !!existingUser;
};