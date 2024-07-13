import db from "@/lib/db";

/**
 * getAccountByUserId - 사용자 ID를 통해 계정을 가져옵니다.
 *
 * @param userId - 사용자 ID
 * */
export const getAccountByUserId = async (userId: string) => {
  try {
    return await db.account.findFirst({
      where: {
        userId: userId,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};