import { ActivityType } from "@/app/_type/activity-type";
import { UserType } from "@/app/_type/user-type";

export type ActivityUserType = {
  id: string;
  userId: string;
  activityId: string;
  User: UserType;
  Activity: ActivityType;
  createdAt: Date;
  updatedAt: Date;
};