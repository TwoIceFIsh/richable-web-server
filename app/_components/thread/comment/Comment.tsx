import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/app/_lib/time-ago";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DeleteIcon, EditIcon, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t_comments } from "@/app/_type/thread-type";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface CommentProps {
  comment: t_comments;
}

const Comment = ({ comment }: CommentProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editComment().then();
    }
  };

  const toggleEdit = () => {
    setOpen(false);
    setEdit(!edit);
  };

  const [open, setOpen] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const deleteComment = async () => {
    const resp = await fetch(`/api/v1/comments/${comment?.c_id}/delete`);
    const data = await resp.json();
    if (data.result) {
      toast.success("삭제되었습니다.");
      setDeleted(true);
    } else {
      toast.error("삭제에 실패하였습니다.");
    }
    setOpen(false);
  };

  const [ecomment, setComment] = useState<t_comments>(comment);
  const [time, setTime] = useState<boolean>(false);
  const editComment = async () => {
    const res = await fetch(`/api/v1/comments/${ecomment?.c_id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ c_content: ecomment?.c_content }),
    });

    const data = await res.json();
    if (data.result) {
      setComment(ecomment);
      setOpen(false);
      setEdit(false);
      toast.success("수정되었습니다.");
      setTime(true);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-2 py-2",
        deleted && "z-10 cursor-not-allowed select-none opacity-30",
      )}
    >
      <Avatar className={"ring-2 ring-green-500"}>
        <AvatarFallback className={"font-bold"}></AvatarFallback>
        <AvatarImage src={ecomment?.c_user?.image} alt={"s"}></AvatarImage>
      </Avatar>
      <div className={"flex w-full flex-col gap-2"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center gap-2"}>
            <div className={"font-bold"}>{ecomment?.c_user?.name}</div>
            <div className={"text-sm"}>
              {ecomment.c_createdAt !== ecomment.c_updatedAt
                ? `${timeAgo(ecomment.c_createdAt)} (수정됨)`
                : time
                  ? `${timeAgo(ecomment.c_createdAt)} (수정됨)`
                  : timeAgo(ecomment.c_createdAt)}
            </div>
          </div>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Ellipsis className={"h-4 w-4"} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="gap-4 text-left">
                <div className={"flex flex-col rounded-xl bg-gray-100"}>
                  <Button
                    variant="ghost"
                    onClick={toggleEdit}
                    className={"flex justify-between font-bold"}
                  >
                    <div>수정하기</div>
                    <div>
                      <EditIcon />
                    </div>
                  </Button>
                </div>
                <div className={"flex flex-col rounded-xl bg-gray-100"}>
                  <Button
                    variant="ghost"
                    onClick={deleteComment}
                    className={"flex justify-between font-bold text-red-600"}
                  >
                    <div>삭제하기</div>
                    <div>
                      <DeleteIcon />
                    </div>
                  </Button>
                </div>
              </DrawerHeader>

              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {edit ? (
          <div className={"flex gap-2"}>
            <Input
              placeholder={"댓글을 수정해 주세요"}
              defaultValue={ecomment?.c_content} // Control the input field with the comment state
              onChange={(e) =>
                setComment({
                  ...ecomment,
                  c_content: e.target.value,
                })
              }
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
            />
            <Button onClick={editComment}>수정</Button>
          </div>
        ) : (
          <div className={"text-muted-foreground"}>{ecomment?.c_content}</div>
        )}
      </div>
    </div>
  );
};

export default Comment;