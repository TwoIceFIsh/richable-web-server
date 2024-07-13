"use server";

import * as z from "zod";

import { currentUser } from "@/app/_lib/current-user";
import db from "@/lib/db";
import { getUserAllByUserId } from "@/app/_actions/user/get-user-all-by-user-id";
import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";

import { SettingsSchema } from "@/app/_schemas/settings-schema";
import { comparePassword } from "@/app/_actions/auth/password/compare-password";
import { getHashedPassword } from "@/app/_actions/auth/password/get-hashed-password";

/**
 * settingsBasic - 사용자 설정을 업데이트합니다.
 * OAuth 사용자는 이메일, 비밀번호 변경 불가능
 *
 * @param values - name, isTwoFactorEnabled, role, email, password, newPassword
 * */
export const settingsBasic = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "인증되지 않음" };
  }

  const dbUser = await getUserAllByUserId(user?.id);

  if (!dbUser) {
    return { error: "사용자를 찾을 수 없음" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // 이메일 변경 시 이메일 중복 확인
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser?.data?.id !== user.id) {
      return { error: "이미 사용 중인 이메일" };
    }
  }

  // 비밀번호 확인
  if (values.password && values.newPassword && dbUser?.data?.password) {
    const passwordMatch = await comparePassword(
      values.password,
      dbUser?.data?.password,
    );

    if (!passwordMatch) {
      return { error: "비밀번호가 일치하지 않음" };
    }
    values.password = await getHashedPassword(values.newPassword as string);
  }

  delete values.newPassword;

  await db.user.update({
    where: {
      id: dbUser?.data?.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "설정 업데이트 완료" };
};