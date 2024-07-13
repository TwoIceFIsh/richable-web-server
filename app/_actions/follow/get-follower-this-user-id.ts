// no use server -> auth.ts
"use server";
import db from "@/lib/db";
import { getUserTypeByUserId } from "@/app/_actions/user/get-user-type-by-id";
import { UserFollowerType } from "@/app/_type/user-follower-type";
import { toUserFollowerType } from "@/app/_utils/to-user-follower-type";

/**
 * getUserWithFollowById - id를 이용하여 해당 유저의 정보를 가져옵니다.
 * 해당유저를 팔로잉 하는 팔로워의 리스트를 가져옵니다.
 * @param id - 유저의 id
 */
export const getFollowerThisUserId = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
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

  return toUserFollowerType(refinedData as UserFollowerType);
};