"use server";
import db from "@/lib/db";

/**
 * userActive - 유저의 활성화 상태를 변경합니다.
 * @param id - 유저의 id
 * @param isActivated - 변경할 활성화 상태
 */
export const setUserActive = async (id: string, isActivated: boolean) => {
  return db.user.update({
    where: { id },
    data: { isActivated: isActivated },
  });
};