"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { z } from "zod";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";

import { logger } from "@/app/_utils/logger";
import { getAccountByUserId } from "@/app/_actions/auth/get-account-by-user-id";
import { SignInSchema } from "@/app/_schemas/sign-in-schema";

/**
 * loginBasic - 이메일과 비밀번호로 로그인합니다.
 *
 * @param values - email, password
 * */
export const loginBasic = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "부적절한 입력값" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    await logger(`로그인 실패`, `회원 정보 불일치 ${email}`);
    return {
      error: "정보를 확인하여 주세요",
    };
  }

  const account = await getAccountByUserId(existingUser?.data?.id as string);
  if (account) {
    return {
      error: `${account.provider} 계정으로 로그인해 주세요`,
    };
  }

  if (!existingUser?.data?.isActivated) {
    await logger(`로그인 실패`, `이메일 인증 필요 ${email}`);
    return {
      error: "이메일 인증이 필요합니다",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          await logger(`로그인 실패`, `계정 정보 불일치 ${email}`);
          return { error: "계정 정보 불일치" };

        default:
          await logger(`로그인 실패`, `계정 정보 불일치 ${email}`);
          return {
            error: "계정 정보 불일치!",
          };
      }
    }
    throw error;
  }
};