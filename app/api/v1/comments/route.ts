import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/app/_lib/current-user";
import { createComment } from "@/app/_actions/thread/comment/create-comment";

/**
 * 현재 유저가 게시글에 댓글을 작성 합니다.
 * */
export async function POST(request: NextRequest) {
  const user = await currentUser();
  const { t_id, c_content } = await request.json();
  if (c_content === "") {
    return NextResponse.json({
      result: false,
      data: "내용을 입력해주세요.",
    });
  }
  const res = await createComment(t_id, user?.id as string, c_content);

  return NextResponse.json({ result: true, data: res });
}