import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/app/_lib/response-data";
import { getThreadsTakeSkip } from "@/app/_actions/thread/get-threads-take-skip";

export async function POST(request: NextRequest) {
  const { take = 3, page = 1, date = null } = await request.json();
  const data = await getThreadsTakeSkip(take, page, date);
  return NextResponse.json(await ResponseData(data, true));
}