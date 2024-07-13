import { UserRole } from "@prisma/client";

/**
 * 사용자의 기본 반환 타입
 * */
export type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
  content: string;
  role: UserRole;
  isActivated: boolean;
};