import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { comparePassword } from "@/app/_actions/auth/password/compare-password";

import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";
import { SignInSchema } from "@/app/_schemas/sign-in-schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user.data || !user?.data?.password) return null;
          const passwordsMatch = await comparePassword(
            password,
            user?.data?.password,
          );
          if (passwordsMatch) {
            return user.data;
          }
        }
        return null;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;