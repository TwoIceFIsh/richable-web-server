"use server";

import { z } from "zod";
import db from "@/lib/db";
import { createTokenByEmail } from "@/app/_actions/auth/token/create-token-by-email";
import { RegisterSchema } from "@/app/_schemas/register-schema";
import {
  getMailContent,
  MailContent,
  transporter,
} from "@/app/_utils/send-mail";
import { checkEmailAsBoolean } from "@/app/_actions/auth/check-email-as-boolean";
import { getHashedPassword } from "@/app/_actions/auth/password/get-hashed-password";

/**
 * zod의 RegisterSchema를 통해 유효성 검사를 진행하고, User를 생성합니다.
 * 이미 존재하는 이메일인지 확인하고, 인증 메일을 보냅니다.
 *
 * @param values - email, password
 * */
export const signUpBasic = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "입력값 오류",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await checkEmailAsBoolean(email);

  if (existingUser) {
    return {
      error: "이미 사용중인 이메일 입니다",
    };
  }
  const hashedPassword = await getHashedPassword(password);
  try {
    const result = await db.user.create({
      data: {
        email: email,
        name: email.split("@")[0],
        password: hashedPassword,
        Exp: {
          create: {
            rankId: "1",
          },
        },
      },
    });

    if (result?.email) {
      const token = await createTokenByEmail(result.email);
      const mailContent: MailContent = {
        subject: "[인증] 리치에이블 이메일 인증을 해주세요",
        html: `<div> 아래 링크를 클릭하여 인증하세요. <br> <a href="${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/verify/${token.token}">${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/verify/${token.token}</a> </div>`,
        to: result.email,
      };
      await transporter.sendMail(getMailContent(mailContent));
    }

    return {
      success: "이메일을 확인하여 인증해 주세요",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "알 수 없는 오류",
    };
  }
};