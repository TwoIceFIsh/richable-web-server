import { UserRole } from "@prisma/client";
import { UserType } from "@/app/_type/user-type";

/**
 * 사용자의 기본 반환 타입
 * */
export type UserFollowingType = {
  id: string;
  name: string;
  email: string;
  image: string;
  content: string;
  role: UserRole;
  isActivated: boolean;
  Following: UserType[];
};