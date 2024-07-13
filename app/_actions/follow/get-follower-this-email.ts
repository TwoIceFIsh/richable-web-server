"use server";

import db from "@/lib/db";
import { getUserTypeByUserId } from "@/app/_actions/user/get-user-type-by-id";
import { toUserFollowerType } from "@/app/_utils/to-user-follower-type";
import { UserFollowerType } from "@/app/_type/user-follower-type";
import { ResponseData } from "@/app/_lib/response-data";

/**
 * getUserWithFollowByEmail - 이메일을 이용하여 해당 유저의 정보를 가져옵니다.
 * @param email - 유저의 이메일
 */
export const getFollowerThisEmail = async (email: string) => {
  if (email?.includes("%40")) email = email.replace(/%40/g, "@");

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      Following: true,
    },
  });

  const follower = await Promise.all(
    user?.Following?.map(async (follow) => {
      return await getUserTypeByUserId(follow.followerId);
    }) || [], // Provide an empty array as fallback
  );

  const refinedData = {
    ...user,
    Follower: follower,
  };
  const data = await toUserFollowerType(refinedData as UserFollowerType);
  return ResponseData(data, true);
};