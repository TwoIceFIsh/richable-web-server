import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/app/_lib/current-user";
import db from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { c_id: string } },
) {
  const user = await currentUser();

  const body = await request.json();
  const data = await db.comments.update({
    where: {
      c_id: params.c_id,
      u_id: user?.id,
    },
    data: {
      c_content: body.c_content,
    },
  });
  return NextResponse.json({ result: true, data: data });
}