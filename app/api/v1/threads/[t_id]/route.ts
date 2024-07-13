import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";
import { currentUser } from "@/app/_lib/current-user";
import { updateThreadView } from "@/app/_actions/thread/view/update-thread-view";

export async function GET(
  request: NextRequest,
  { params }: { params: { t_id: string } },
) {
  const user = await currentUser();
  try {
    const data = await db.thread.findUnique({
      where: {
        t_id: params.t_id,
      },
      include: {
        t_view: true,
        t_like: true,
        t_user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        t_comments: {
          orderBy: {
            c_createdAt: "asc",
          },
          include: {
            c_user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    const tl_data = {
      ...data,
      t_like: data?.t_like.length || 0,
    };

    const tv_data = {
      ...tl_data,
      t_view: data?.t_view.length || 0,
    };

    await updateThreadView(params?.t_id, user?.id as string);
    return NextResponse.json(await ResponseData(tv_data, true));
  } catch (e) {
    return NextResponse.json(await ResponseData(e, false));
  }
}

/**
 * 포스트 내용 업데이트
 * */
export async function POST(
  request: NextRequest,
  { params }: { params: { t_id: string } },
) {
  const user = await currentUser();
  const body = await request.json();
  const thread = await db.thread.findFirst({
    where: {
      t_id: params?.t_id,
      u_id: user?.id,
    },
  });
  if (thread) {
    await db.thread.update({
      data: {
        t_content: body?.t_content,
      },
      where: {
        t_id: params?.t_id,
      },
    });
    return NextResponse.json(await ResponseData(true, true));
  } else {
    return NextResponse.json(await ResponseData("권한이 없습니다.", false));
  }
}