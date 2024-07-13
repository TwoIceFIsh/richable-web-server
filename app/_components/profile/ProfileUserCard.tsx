import React, { useContext, useEffect, useState } from "react";
import { BasicType } from "@/app/_type/basic-type";
import { toggleFollowThisEmail } from "@/app/_actions/follow/toggle-follow-this-email";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserFollowerType } from "@/app/_type/user-follower-type";
import { MySession } from "@/app/_components/common/SessionContext";

interface UserCardProps {
  data: BasicType<UserFollowerType>;
}

const ProfileUserCard = ({ data }: UserCardProps) => {
  const [user, setUser] = useState<BasicType<UserFollowerType>>(data);
  const [isFoll, setIsFollowing] = useState(false);
  const session = useContext(MySession);

  const onClickFollow = async () => {
    await toggleFollowThisEmail(user?.data?.email as string).then((data) => {
      if (data?.success) {
        setIsFollowing(true);
        toast.success(data.success);
      } else {
        setIsFollowing(false);
        toast.error(data.error);
      }
    });
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <div className={"flex flex-col justify-between gap-4 p-6"}>
      <div className={"flex items-center justify-between"}>
        <div className={"flex flex-col"}>
          <div className={"text-3xl font-bold"}>{user?.data?.name}</div>
          <div>{user?.data?.email}</div>
        </div>
        <div className={"flex gap-4"}>
          <Avatar className={"h-28 w-28"}>
            <AvatarFallback>{user?.data?.name?.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={user?.data?.image as string}></AvatarImage>
          </Avatar>
        </div>
      </div>
      <div className={"text-lg"}>{user?.data?.content}</div>
      <div className={"mb-4 flex items-center gap-2 text-lg text-gray-500"}>
        <div>팔로워 {user?.data?.Follower?.length}명</div>
        <div className={"flex"}>
          {user?.data?.Follower?.slice(0, 10).map((follower, key) => (
            <Avatar
              key={key}
              className={cn(
                `h-4 w-4 ring-2 ring-green-500`,
                (user?.data?.Follower?.length as number) > 0 && "-mr-1.5",
              )}
            >
              <AvatarFallback className={"font-bold"}></AvatarFallback>
              <AvatarImage
                src={follower?.image}
                alt={follower.email}
              ></AvatarImage>
            </Avatar>
          ))}
        </div>
      </div>
      <div className={"flex gap-4"}>
        {user?.data?.id === session?.session?.id ? (
          <>
            <Link
              href={"/profile"}
              className={"flex w-full rounded-3xl bg-gray-400"}
            >
              <Button className={"flex-1 text-xl font-bold"}>
                프로필 수정
              </Button>
            </Link>
          </>
        ) : (
          <>
            {isFoll ? (
              <Button
                onClick={onClickFollow}
                variant={"outline"}
                className={"flex-1 rounded-xl text-xl font-bold"}
              >
                팔로잉
              </Button>
            ) : (
              <Button
                onClick={onClickFollow}
                className={"flex-1 rounded-xl text-xl font-bold"}
              >
                팔로우
              </Button>
            )}
            {/*<Button*/}
            {/*  className={"flex-1 rounded-xl text-xl font-bold"}*/}
            {/*  variant={"outline"}*/}
            {/*>*/}
            {/*  언급*/}
            {/*</Button>*/}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileUserCard;