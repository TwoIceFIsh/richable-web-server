"use client";
import React, { useEffect, useState } from "react";
import { t_comments, ThreadType } from "@/app/_type/thread-type";
import {
  ChevronLeft,
  DeleteIcon,
  EditIcon,
  EllipsisIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import "../../globals.css";
import { BasicType } from "@/app/_type/basic-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/app/_lib/time-ago";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Comment from "@/app/_components/thread/comment/Comment";
import Editor from "@/app/_components/editor/editor";
import { cn } from "@/lib/utils";
import { fetchJson } from "@/app/_hooks/fetch-json";

const MainIdTidPage = ({ params }: { params: { tid: string } }) => {
  const [thread, setThread] = useState<BasicType<ThreadType>>();
  const [comment, setComment] = useState<string>("");
  const [deleted, setDeleted] = useState<boolean>(false);
  const [unknown, setUnknown] = useState<boolean>(false);
  // const addComment = async () => {
  //   if (comment === "") toast.error("내용을 입력해주세요.");
  //   const result = await fetch(`/api/v1/comments`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       t_id: params.tid,
  //       c_content: comment,
  //     }),
  //   });
  //   const res = await result.json();
  //   if (res.result) {
  //     toast.success("댓글이 등록되었습니다.", {
  //       position: "top-right",
  //     });
  //     setComment(""); // Reset the input field
  //     const newComment: t_comments = res.data;
  //     // 데이터를 갱신한다.
  //     setThread(
  //       (prevThread) =>
  //         ({
  //           ...prevThread,
  //           data: {
  //             ...prevThread?.data,
  //             t_comments: [
  //               newComment,
  //               ...(prevThread?.data?.t_comments as t_comments[]),
  //             ],
  //           },
  //         }) as BasicType<ThreadType>,
  //     );
  //     toast.success(JSON.stringify(newComment));
  //   } else {
  //     toast.error(res?.data);
  //   }
  // };

  const addComment = async () => {
    if (comment === "") {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const result = await fetch(`/api/v1/comments`, {
      method: "POST",
      body: JSON.stringify({
        t_id: params.tid,
        c_content: comment,
      }),
    });

    const res = await result.json();
    if (res.result) {
      toast.success("댓글이 등록되었습니다.", {
        position: "top-right",
      });
      setComment(""); // Reset the input field
      const newComment: t_comments = res.data;
      thread?.data?.t_comments.push(newComment);
    } else {
      toast.error(res?.data);
    }
  };
  const editThread = async () => {
    const modifiedContent = localStorage.getItem("editorContent");

    const res = await fetchJson(`/api/v1/threads/${params.tid}`, {
      method: "POST",
      body: JSON.stringify({
        t_content: modifiedContent,
      }),
    });

    if (res.result) {
      toast.success("수정되었습니다.", {
        position: "top-right",
      });
      setThread(
        (prevThread) =>
          ({
            ...prevThread,
            data: {
              ...prevThread?.data,
              t_content: thread?.data?.t_content,
            },
          }) as BasicType<ThreadType>,
      );
      setEdit(false);
    } else {
      toast.error(res?.result);
    }
  };

  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchThread = async () => {
      const response = await fetchJson<ThreadType>(
        `/api/v1/threads/${params.tid}`,
      );
      if (response.result) {
        setThread(response);
      } else {
        setUnknown(true);
      }
    };
    fetchThread().then();
  }, [params.tid]);

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };

  const deleteThread = async () => {
    const resp = await fetchJson(
      `/api/v1/threads/${thread?.data?.t_id}/delete`,
    );
    if (resp.result) {
      toast.success("삭제 성공");
      setDeleted(true);
    } else {
      toast.error("삭제 실패");
    }
  };

  return (
    <div className={"flex w-full justify-center sm:px-20"}>
      <div
        className={
          "flex h-full w-[800px] flex-col items-center justify-center pt-6 sm:pt-0"
        }
      >
        <div className={"h-full w-full"}>
          <div
            className={
              "hidden items-center justify-between gap-x-6 py-5 text-center text-xl font-bold sm:flex"
            }
          >
            <div
              onClick={() => router.back()}
              className={
                "flex shrink-0 cursor-pointer items-center justify-center rounded-full border-gray-200 p-1 shadow-md"
              }
            >
              <ChevronLeft className={"h-5 w-5"} />
            </div>
            <div>스레드</div>
            <div></div>
          </div>
          <div
            className={
              "flex w-full flex-col rounded-2xl border-2 bg-white pb-32 pt-10 shadow-md sm:pb-0 sm:pt-0"
            }
          >
            {unknown ? (
              <div className={"flex items-center justify-between p-6"}>
                <div
                  className={
                    "flex w-full items-start gap-4 text-center text-3xl font-bold"
                  }
                >
                  <div className={"w-full text-center"}>
                    ⛔ 존재하지 않는 스레드 입니다.
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "flex w-full flex-col items-start justify-center gap-2 p-6",
                  deleted && "select-none opacity-30",
                )}
              >
                <div className={"flex w-full flex-col items-start gap-2"}>
                  <div
                    className={"flex w-full items-center justify-between gap-3"}
                  >
                    <div className={"flex gap-3"}>
                      <div className={"flex items-center"}>
                        <Avatar className={"ring-2 ring-green-500"}>
                          <AvatarFallback
                            className={"font-bold"}
                          ></AvatarFallback>
                          <AvatarImage
                            src={thread?.data?.t_user?.image as string}
                            alt={"s"}
                          ></AvatarImage>
                        </Avatar>
                      </div>
                      <div className={"flex flex-col"}>
                        <div className={"font-bold"}>
                          {thread?.data?.t_user.name}
                        </div>
                        <div className={"text-sm text-muted-foreground"}>
                          {timeAgo(thread?.data?.t_updatedAt as Date)}
                          {thread?.data?.t_updatedAt !==
                            thread?.data?.t_createdAt && "(수정됨)"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon className={"w-h-4"} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => setEdit(true)}
                            className={"w-full justify-between font-bold"}
                          >
                            <div>수정하기</div>
                            <div>
                              <EditIcon className={"h-4 w-4"} />{" "}
                            </div>
                          </DropdownMenuItem>
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
                  </div>
                  <div className={"flex w-full"}>
                    <Editor data={thread?.data?.t_content} editable={edit} />
                  </div>
                  {edit && (
                    <div
                      className={"flex w-full items-center justify-end"}
                      onClick={editThread}
                    >
                      <Button>수정하기</Button>
                    </div>
                  )}
                </div>
                <div className={"ml-12 flex items-center justify-between"}>
                  <div className={"flex flex-row gap-2"}>
                    <div className={"flex items-center gap-2"}>
                      <HeartIcon className={"h-4 w-4"} />
                      {thread?.data?.t_like}
                    </div>
                    <div className={"flex items-center gap-2"}>
                      <MessageCircleIcon className={"h-4 w-4"} />
                      {thread?.data?.t_comments.length}
                    </div>
                    <div className={"flex items-center gap-2"}>
                      <EyeIcon className={"h-4 w-4"} />
                      {thread?.data?.t_view}
                    </div>
                  </div>
                </div>

                <div className={"hidden w-full bg-white sm:block"}>
                  <div className={"flex gap-2"}>
                    <Input
                      placeholder={"댓글을 남겨주세요"}
                      value={comment} // Control the input field with the comment state
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                    />
                    <Button onClick={addComment}>등록</Button>
                  </div>
                </div>
                <hr className={"w-full border"} />

                <div className={"w-full"}>
                  {thread?.data?.t_comments?.length === 0 ? (
                    <div>댓글이 없습니다.</div>
                  ) : (
                    thread?.data?.t_comments?.map((comment, idx) => (
                      <>
                        <Comment key={idx} comment={comment} />
                        {(thread?.data?.t_comments?.length as number) - 1 !==
                          idx && <hr className={"w-full border"} />}
                      </>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile View Write Box*/}
      <div
        className={
          "fixed bottom-16 left-0 w-full rounded-t-lg border bg-white p-4 sm:hidden"
        }
      >
        <div className={"flex items-center justify-between"}>
          <div className={"flex flex-row gap-2"}>
            <div className={"flex items-center gap-2"}>
              <HeartIcon className={"h-4 w-4"} />
              {thread?.data?.t_like}
            </div>
            <div className={"flex items-center gap-2"}>
              <MessageCircleIcon className={"h-4 w-4"} />
              {thread?.data?.t_comments.length}
            </div>
            <div className={"flex items-center gap-2"}>
              <EyeIcon className={"h-4 w-4"} />
              {thread?.data?.t_view}
            </div>
          </div>
        </div>
        <div className={"flex gap-2"}>
          <Input
            placeholder={"댓글을 남겨주세요"}
            value={comment} // Control the input field with the comment state
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown} // Add the onKeyDown event handler
          />
          <Button onClick={addComment}>등록</Button>
        </div>
      </div>
    </div>
  );
};

export default MainIdTidPage;