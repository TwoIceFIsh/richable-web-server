"use server";
import db from "@/lib/db";
import { currentUser } from "@/app/_lib/current-user";
import { getUserByEmail } from "@/app/_actions/user/get-user-by-email";

/*
 * 현재 접속한 유저가 팔로우 합니다.
 * @param followingId 팔로우 하는 유저의 아이디
 * */
export const toggleFollowThisEmail = async (email: string) => {
  const user = await currentUser();
  const target = await getUserByEmail(email.replace(/%40/g, "@"));

  const result = await db.follow.findFirst({
    where: {
      followerId: user?.id as string,
      followingId: target?.data?.id as string,
    },
  });
  if (!result) {
    const result = await db.follow.create({
      data: {
        followerId: user?.id as string,
        followingId: target?.data?.id as string,
      },
    });
    if (result) return { success: "팔로우 성공" };
    else return { error: "팔로우 실패" };
  } else {
    await db.follow.delete({
      where: {
        id: result.id,
      },
    });
    return { error: "언팔로우 성공" };
  }
};