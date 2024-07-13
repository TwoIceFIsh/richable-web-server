"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

/**
 * socialLogin - 소셜 로그인을 진행합니다.
 *
 * @param provider - google, github, kakao
 * */
export const socialLogin = async (provider: "google" | "github" | "kakao") => {
  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw error;
  }
};