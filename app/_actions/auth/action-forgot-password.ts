"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import db from "@/lib/db";
import { ResetSchema } from "@/app/_schemas/settings-schema";
import { logger } from "@/app/_utils/logger";
import {
  getMailContent,
  MailContent,
  transporter,
} from "@/app/_utils/send-mail";
import { getRandomPassword } from "@/app/_actions/auth/password/get-random-password";
import { getHashedPassword } from "@/app/_actions/auth/password/get-hashed-password";
import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";
import { getAccountByUserId } from "@/app/_actions/auth/get-account-by-user-id";

/**
 * actionForgotPassword - 비밀번호를 잊어버렸을 때, 임시 비밀번호를 전송합니다.
 *
 * @param values - email
 * */
export const actionForgotPassword = async (
  values: z.infer<typeof ResetSchema>,
) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "부적절한 입력값" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  const account = await getAccountByUserId(existingUser?.data?.id as string);

  if (account) {
    return {
      error: `${account.provider} 계정으로 로그인해 주세요`,
    };
  }

  if (!existingUser) {
    await logger(`로그인 실패`, `회원 정보 불일치 ${email}`);

    return {
      error: "정보를 확인하여 주세요",
    };
  }

  const tempPassword = getRandomPassword();
  const hashedPassword = await getHashedPassword(tempPassword);

  try {
    const user = await db.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: email,
      },
    });
    if (user.email) {
      await logger(`이메일 전송`, `비밀번호 찾기 ${email}`);

      const mailContent: MailContent = {
        subject: "[인증] 리치에이블 임시 비밀번호를 확인해 주세요",
        html: `<div> 임시비밀번호 :  <br><a
             >               ${tempPassword}</a> </div>`,
        to: user.email,
      };

      await transporter.sendMail(getMailContent(mailContent));
      return { success: "이메일을 확인해 주세요" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          await logger(`인증 실패`, `계정 정보 불일치 ${email}`);
          return {
            result: false,
            message: { title: "인증 실패", description: "계정 정보 불일치" },
          };

        default:
          await logger(`인증 실패`, `인증 정보 불일치 ${email}`);
          return {
            error: "인증 정보 불일치",
          };
      }
    }
    await logger(`인증 실패`, `인증 정보 불일치 ${email}`);
    return { error: "인증 정보 불일치" };
  }

  return { error: "알 수 없는 오류" };
};