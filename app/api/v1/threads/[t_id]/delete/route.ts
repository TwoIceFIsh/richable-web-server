import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { t_id: string } },
) {
  const data = await db.thread.findUnique({
    where: {
      t_id: params.t_id,
    },
  });

  if (!data) return NextResponse.json(await ResponseData(null, false));

  const result = await db.thread.delete({
    where: {
      t_id: data?.t_id,
    },
  });

  if (result) return NextResponse.json(await ResponseData(null, true));
}