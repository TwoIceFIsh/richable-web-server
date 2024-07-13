"use server";
import { UserRole } from "@prisma/client";
import { UserFollowingType } from "@/app/_type/user-following-type";
import { UserType } from "@/app/_type/user-type";

export const toUserFollowingType = async (user: UserFollowingType) => {
  return {
    id: user?.id as string,
    email: user?.email as string,
    name: user?.name as string,
    role: user?.role as UserRole,
    image: user?.image as string,
    content: user?.content as string,
    isActivated: user?.isActivated as boolean,
    Following: user?.Following as UserType[],
  };
};