"use server";
import db from "@/lib/db";
import uuid from "react-uuid";

/**
 * createTokenByEmail - 이메일을 사용하여 토큰을 생성합니다.
 *
 * @param email - 이메일
 * */
export const createTokenByEmail = async (email: string) => {
  return db.verificationToken.create({
    data: {
      identifier: email,
      token: uuid(),
      expires: new Date(Date.now() + 3600000), // 1 hour
    },
  });
};