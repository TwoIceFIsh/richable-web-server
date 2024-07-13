"use server";
import { z } from "zod";
import { UserUpdateSchema } from "@/app/_schemas/user-update-schema";
import { currentUser } from "@/app/_lib/current-user";
import { getHashedPassword } from "@/app/_actions/auth/password/get-hashed-password";
import db from "@/lib/db";

/**
 * updateUser - 유저 정보를 수정합니다.
 * @param values - 수정할 유저 정보
 */
export const updateUser = async (values: z.infer<typeof UserUpdateSchema>) => {
  const validatedFields = UserUpdateSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "입력값 오류" };
  }

  const cUser = await currentUser();
  if (!cUser) {
    return {
      error: "로그인이 필요합니다.",
    };
  }

  // OAuth 로그인 사용자의 경우 비밀번호 변경 불가
  if (cUser.isOAuth) {
    await db.user.update({
      where: { id: cUser.id },
      data: {
        name: validatedFields.data.name,
        image: validatedFields.data.image as string,
        content: validatedFields.data.content as string,
      },
    });
    return {
      success: `회원정보가 수정되었습니다(OAuth)`,
    };
  }

  // 비밀번호 변경 시
  if (validatedFields.data.password === "") {
    await db.user.update({
      where: { id: cUser.id },
      data: {
        name: validatedFields.data.name,
        image: validatedFields.data.image as string,
        content: validatedFields.data.content as string,
      },
    });
    return {
      success: "회정 정보가 수정되었습니다(비밀번호 미포함)",
    };
  } else {
    const hashedPassword = await getHashedPassword(
      validatedFields?.data?.password as string,
    );
    await db.user.update({
      where: { id: cUser.id },
      data: {
        name: validatedFields.data.name,
        password: hashedPassword,
        image: validatedFields.data.image as string,
        content: validatedFields.data.content as string,
      },
    });
    return {
      success: "회정 정보가 수정되었습니다(비밀번호 포함)",
    };
  }
};