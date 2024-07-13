"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { MySession } from "@/app/_components/common/SessionContext";

export const UserButton = () => {
  const session = useContext(MySession);

  // const session = useCurrentUser();
  return (
    <Avatar className={"bg-white ring-4 ring-green-400"}>
      <AvatarImage src={session?.session?.image || ""} />
      <FaUser />
      <AvatarFallback>{session?.session?.name?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};