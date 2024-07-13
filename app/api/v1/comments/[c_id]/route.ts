import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { c_id: string } },
) {
  const data = await db.comments.findUnique({
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