"use server";
import { UserRole } from "@prisma/client";
import { UserType } from "@/app/_type/user-type";

export const toUserType = async (user: any) => {
  return {
    id: user?.id as string,
    email: user?.email as string,
    name: user?.username as string,
    role: user?.role as UserRole,
    image: user?.image as string,
    content: user?.content as string,
    isActivated: user?.isActivated as boolean,
  } as UserType;
};