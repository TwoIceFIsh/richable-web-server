"use client";
import "react-quill/dist/quill.snow.css";
import React, { useContext, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WriteBox from "@/app/_components/thread/WriteBox";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { MySession } from "@/app/_components/common/SessionContext";

interface WriteModalProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WriteModal(props: WriteModalProps) {
  const session = useContext(MySession);
  useEffect(() => {
    if (props.writeModal) {
      localStorage.setItem("editorContent", "");
    }
  }, [props.writeModal]);

  return (
    <>
      <div
        className={
          "fixed mt-16 flex h-full w-full items-center justify-center sm:mt-0"
        }
      >
        <div
          className={
            "flex h-full w-[800px] flex-col gap-2 rounded-3xl bg-white p-3 sm:h-[540px] sm:p-6"
          }
        >
          <div className={"flex items-center justify-between gap-2 sm:hidden"}>
            <div className={"flex-1 text-center font-bold"}>새로운 스레드</div>
          </div>
          <div className={"flex items-center justify-between gap-2"}>
            <div className={"flex items-center gap-4"}>
              <Avatar className={"h-14 w-14 ring-2 ring-green-500"}>
                <AvatarFallback className={"font-bold"}></AvatarFallback>
                <AvatarImage
                  src={session?.session?.image}
                  alt={"s"}
                ></AvatarImage>
              </Avatar>
              <div className={"flex h-5 flex-col"}>
                <div>{session?.session?.name}</div>
              </div>
            </div>

            <div
              className={"cursor-pointer transition hover:text-red-600"}
              onClick={() => props.setWriteModal(!props.writeModal)}
            >
              <CloseIcon />
            </div>
          </div>
          <WriteBox setWriteModal={props.setWriteModal} />
        </div>
      </div>
    </>
  );
}