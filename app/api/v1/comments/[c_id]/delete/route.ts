import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { currentUser } from "@/app/_lib/current-user";

export async function GET(
  request: NextRequest,
  { params }: { params: { c_id: string } },
) {
  const user = await currentUser();
  const check = await db.comments.findFirst({
    where: {
      c_id: params.c_id,
      u_id: user?.id,
    },
  });

  if (check) {
    const data = await db.comments.delete({
      where: {
        c_id: params.c_id,
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
    });
    return NextResponse.json({ result: true, data: data });
  }
  return NextResponse.json({ result: false, data: null });
}