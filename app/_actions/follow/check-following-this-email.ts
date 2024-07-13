"use server";
/*
 * 현재 접속한 유저가 해당 유저를 팔로우 중인지 확인 합니다.
 * @param email 팔로우 하는 유저의 아이디
 * */
import { currentUser } from "@/app/_lib/current-user";
import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";

import db from "@/lib/db";

/**
 * checkFollowingThisUser - 현재 접속한 유저가 해당 유저를 팔로우 중인지 확인 합니다.
 * @param email - 팔로우 하는 유저의 이메일
 * */
export const checkFollowingThisUser = async (email: string) => {
  const user = await currentUser();
  const target = await getUserByEmail(email.replace(/%40/g, "@"));

  // 타겟 유저를 Following하는 followerId이면 해당 유저 데이터를 획득
  const result = await db.user.findFirst({
    where: {
      id: target?.data?.id as string,
      Following: {
        some: {
          followerId: user?.id as string,
        },
      },
    },
  });

  if (result) {
    return { success: "팔로우 중" };
  } else {
    return { error: "팔로우 중이 아님" };
  }
};