import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

/**
 * zod의 UserUpdateSchema를 통해 유효성 검사를 진행합니다.
 * */
export const UserUpdateSchema = z.object({
  name: z.string().min(2).max(8, {
    message: "최대 8자 이내로 입력해주세요.",
  }),
  password: z
    .optional(z.string().regex(passwordValidation).min(8).max(16))
    .or(z.literal("")),
  image: z.optional(z.string().url().nullable()),
  content: z.string().min(0).nullable(),
});