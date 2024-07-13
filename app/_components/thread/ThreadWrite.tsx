import React, { useContext } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MySession } from "@/app/_components/common/SessionContext";

interface ThreadWriteProps {
  setWriteModal: (value: boolean) => void;
}

const ThreadWrite = ({ setWriteModal }: ThreadWriteProps) => {
  const session = useContext(MySession);

  return (
    <div className={"hidden items-center justify-between p-6 sm:flex"}>
      {/* Write Box */}
      <div className={"flex w-full items-center gap-4"}>
        <Link href={"/" + session?.session?.email}>
          <Avatar className={"h-12 w-12"}>
            <AvatarFallback>
              {session?.session?.name?.slice(0, 2)}
            </AvatarFallback>
            <AvatarImage src={session?.session?.image}></AvatarImage>
          </Avatar>
        </Link>

        <text
          className={
            "mx-4 w-full cursor-text border-none text-xl text-gray-400"
          }
          onClick={() => setWriteModal(true)}
        >
          스레드를 시작하세요...
        </text>
      </div>
      <Button variant={"outline"} className={"rounded-xl text-xl font-bold"}>
        게시
      </Button>
    </div>
  );
};

export default ThreadWrite;