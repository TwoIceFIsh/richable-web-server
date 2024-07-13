import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/app/_lib/response-data";
import { getFollowingThisUserId } from "@/app/_actions/follow/get-following-this-user-id";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = await getFollowingThisUserId(params.id as string);
  return NextResponse.json(await ResponseData(result, true));
}