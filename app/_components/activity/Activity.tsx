import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/app/_lib/time-ago";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityUserType } from "@/app/_type/activity-user-type";

interface ActivityProps {
  ActivityUser: ActivityUserType;
}

const Activity = ({ ActivityUser }: ActivityProps) => {
  if (!ActivityUser) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-96" />
        </div>
      </div>
    );
  }

  return (
    <div className={"flex py-4"}>
      <div className={"flex items-start justify-start gap-2"}>
        <Avatar>
          <AvatarImage src={ActivityUser?.User?.image as string}></AvatarImage>
          <AvatarFallback>OO</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col"}>
          <div className={"flex gap-2"}>
            <div>{ActivityUser?.User?.name}</div>
            <div>{timeAgo(ActivityUser?.createdAt)}</div>
          </div>
          <div>{ActivityUser?.Activity?.title}</div>
          <div>{ActivityUser?.Activity?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Activity;