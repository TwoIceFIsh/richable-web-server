"use client";
import React, { useTransition } from "react";
import Editor from "@/app/_components/editor/editor";
import { toast } from "sonner";
import { saveThreadByCurrentUser } from "@/app/_actions/thread/save-thread-by-current-user";
import { Button } from "@/components/ui/button";

interface WriteModalProps {
  setWriteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WriteBox(props: WriteModalProps) {
  const [isPending, startTransition] = useTransition();
  const onClick = async () => {
    startTransition(async () => {
      const data = localStorage.getItem("editorContent");
      if (data === "") {
        toast.error("내용을 입력해주세요.");
      } else {
        const result = await saveThreadByCurrentUser({
          thread: { content: data as string },
        });

        if (result.success) {
          toast.success(result.success);
          props.setWriteModal(false); // 게시글 저장 후 모달 닫기
        } else {
          toast.error(result.error);
        }
      }
    });
  };
  return (
    <div>
      <div className={"h-96 overflow-y-auto"}>
        <Editor />
      </div>
      <div className={"flex w-full justify-end"}>
        <Button
          disabled={isPending}
          variant={"default"}
          className={"w-36"}
          onClick={onClick}
        >
          게시하기
        </Button>
      </div>
    </div>
  );
}