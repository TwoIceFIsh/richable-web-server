"use server";
import db from "@/lib/db";
import { currentUser } from "@/app/_lib/current-user";

/**
 * saveThreadByCurrentUser - 현재 유저가 해당 쓰레드에 댓글을 저장합니다.
 * @param data - thread: { content: string }
 */
export const saveThreadByCurrentUser = async (data: {
  thread: { content: string };
}) => {
  const user = await currentUser();

  if (data.thread?.content === "") {
    return {
      error: "내용을 입력해주세요",
    };
  }

  if (user?.id) {
    await db.thread.create({
      data: {
        u_id: user?.id,
        t_content: data.thread.content,
      },
    });
    return {
      success: "게시글이 성공적으로 업로드되었습니다",
    };
  } else {
    return {
      error: "로그인 후 이용해주세요",
    };
  }
};