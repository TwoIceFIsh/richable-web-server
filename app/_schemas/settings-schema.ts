import { z } from "zod";
import { UserRole } from "@prisma/client";

/**
 * SettingsSchema - 사용자 설정을 검증합니다.
 * */
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(
      z.string().email({
        message: "Invalid email address",
      }),
    ),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});