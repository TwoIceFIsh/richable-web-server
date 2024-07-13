import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, EllipsisIcon } from "lucide-react";
import { ThreadType } from "@/app/_type/thread-type";
import { toast } from "sonner";
import { BasicType } from "@/app/_type/basic-type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Editor from "@/app/_components/editor/editor";
import { timeAgo } from "@/app/_lib/time-ago";
import { MySession } from "@/app/_components/common/SessionContext";

interface NewThreadProps {
  thread: ThreadType;
  href: string;
}

const NewThread = ({ thread, href }: NewThreadProps) => {
  const session = useContext(MySession);
  const [deleted, setDeleted] = useState<boolean>(false);
  const deleteThread = async () => {
    const resp = await fetch(`/api/v1/threads/${thread?.t_id}/delete`);
    const data = (await resp.json()) as BasicType<any>;
    if (data.result) {
      toast.success("삭제 성공");
      setDeleted(true);
    } else {
      toast.error("삭제 실패");
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-center gap-2 p-6",
        deleted && "select-none opacity-30",
      )}
    >
      <div className={"flex w-full flex-col items-start gap-2"}>
        <div className={"flex w-full gap-3"}>
          <div className={"flex items-center"}>
            <Avatar className={"ring-2 ring-green-500"}>
              <AvatarFallback className={"font-bold"}></AvatarFallback>
              <AvatarImage
                src={thread?.t_user?.image as string}
                alt={"s"}
              ></AvatarImage>
            </Avatar>
          </div>
          <div className={"w-full"}>
            <div className={"flex flex-col"}>
              <div className={"flex w-full justify-between font-bold"}>
                <div className={"flex items-center gap-2"}>
                  <div> {thread?.t_user.name}</div>
                  <div className={"text-sm text-muted-foreground"}>
                    {timeAgo(thread?.t_updatedAt as Date)}
                    {thread?.t_updatedAt !== thread?.t_createdAt && "(수정됨)"}
                  </div>
                </div>
                {thread?.t_user?.id === session?.session?.id ? (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisIcon className={"h-4 w-4"} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={deleteThread}
                          className={
                            "w-full justify-between font-bold text-red-600"
                          }
                        >
                          <div>삭제하기</div>
                          <div>
                            <DeleteIcon className={"h-4 w-4"} />{" "}
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={"w-full"}>
          <Link href={href}>
            <Editor data={thread?.t_content} editable={false} />
          </Link>
        </div>
      </div>
      <hr className={"w-full border"} />
    </div>
  );
};

export default NewThread;