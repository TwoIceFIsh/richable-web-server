"use server";
import db from "@/lib/db";

import { ResponseData } from "@/app/_lib/response-data";
import { currentUser } from "@/app/_lib/current-user";
import { getUserTypeByUserId } from "@/app/_actions/user/get-user-type-by-id";
import { toUserFollowerType } from "@/app/_utils/to-user-follower-type";
import { UserFollowerType } from "@/app/_type/user-follower-type";

/*
 * email에 해당하는 유저의 팔로워 목록을 가져옵니다.
 * @param email 팔로우 하는 유저의 아이디
 * */
export const getFollowersThisCurrentUser = async () => {
  const user = await currentUser();
  const cuser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      Following: true,
    },
  });

  const follower = await Promise.all(
    cuser?.Following?.map(async (follow) => {
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