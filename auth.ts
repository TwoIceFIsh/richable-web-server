// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import NextAuth from "next-auth";
import { getUserWithFollowById } from "@/app/_actions/user/get-user-with-follow-by-user-id";

import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { jwtGetUserById } from "@/app/_actions/auth/jwt-get-user-by-id";
import { getAccountByUserId } from "@/app/_actions/auth/get-account-by-user-id";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ token, session }) {
      if (!session) await signOut();

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.tag && session.user) {
        session.user.tag = token.tag;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.isOAuth = token.isOAuth;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await jwtGetUserById(token.sub as string);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser?.id as string,
      );

      token.isOAuth = !!existingAccount;
      token.name = existingUser?.name as string;
      token.email = existingUser?.email as string;
      token.username = existingUser?.username as string;

      token.role = existingUser?.role as UserRole;
      token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled as boolean;

      token.tag = existingUser?.tag as string;

      return token;
    },
    async signIn({ user, account }) {
      // OAuth인 경우 이로직을 타고 true로 흐름을 흘려보내서 로그인 성공하게 한다!
      if (account?.provider !== "credentials") {
        return true;
      }

      // 여기서는 ID/PW 처리를 위한 로직을 수행하게 된다!
      const existingUser = await getUserWithFollowById(user.id);

      if (!existingUser?.data?.emailVerified) return false;

      return !!existingUser;
    },
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 60, // 1 minute
  },
  ...authConfig,
});