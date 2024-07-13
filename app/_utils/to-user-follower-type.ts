"use server";
import { UserRole } from "@prisma/client";
import { UserType } from "@/app/_type/user-type";
import { UserFollowerType } from "@/app/_type/user-follower-type";

export const toUserFollowerType = async (user: UserFollowerType) => {
  return {
    id: user?.id as string,
    email: user?.email as string,
    name: user?.name as string,
    role: user?.role as UserRole,
    image: user?.image as string,
    content: user?.content as string,
    isActivated: user?.isActivated as boolean,
    Follower: user?.Follower as UserType[],
  };
};