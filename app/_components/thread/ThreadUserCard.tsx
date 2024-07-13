import React, { useContext, useEffect, useState } from "react";
import { BasicType } from "@/app/_type/basic-type";
import { UserType } from "@/app/_type/user-type";
import { toggleFollowThisEmail } from "@/app/_actions/follow/toggle-follow-this-email";
import { toast } from "sonner";
import { checkFollowingThisUser } from "@/app/_actions/follow/check-following-this-email";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserTypeByEmail } from "@/app/_actions/user/get-user-type-by-email";
import { UserFollowerType } from "@/app/_type/user-follower-type";
import { getFollowerThisEmail } from "@/app/_actions/follow/get-follower-this-email";
import { cn } from "@/lib/utils";
import { MySession } from "@/app/_components/common/SessionContext";

interface UserCardProps {
  email: string;
}

const ThreadUserCard = ({ email }: UserCardProps) => {
  const [user, setUser] = useState<BasicType<UserType>>();
  const [isFoll, setIsFollowing] = useState(false);
  const data = useContext(MySession);

  useEffect(() => {
    const fetchUser = async () => {
      await getUserTypeByEmail(email).then((data) => {
        setUser(data as BasicType<UserType>);
      });
    };
    fetchUser().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const [followers, setFollowers] = useState<BasicType<UserFollowerType>>();

  useEffect(() => {
    const fetchUser = async () => {
      await getFollowerThisEmail(email).then((data) => {
        return setFollowers(data as BasicType<UserFollowerType>);
      });
    };
    fetchUser().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const onClickFollow = async () => {
    await toggleFollowThisEmail(email).then((data) => {
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
    const isCheck = async () => {
      await checkFollowingThisUser(email).then((data) => {
        // @ts-ignore
        if (data?.success) {
          setIsFollowing(true);
        } else setIsFollowing(false);
      });
    };
    isCheck().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <div>팔로워 {followers?.data?.Follower.length}명</div>
        <div className={"flex"}>
          {followers?.data?.Follower.slice(0, 10).map((user, key) => (
            <Avatar
              key={key}
              className={cn(
                `h-4 w-4 ring-2 ring-green-500`,
                (followers?.data?.Follower.length as number) > 0 && "-mr-1.5",
              )}
            >
              <AvatarFallback className={"font-bold"}></AvatarFallback>
              <AvatarImage src={user?.image} alt={user.email}></AvatarImage>
            </Avatar>
          ))}
        </div>
      </div>
      <div className={"flex gap-4"}>
        {user?.data?.id === data?.session?.id ? (
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

export default ThreadUserCard;