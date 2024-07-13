import { NextRequest, NextResponse } from "next/server";
import { getFollowerThisUserId } from "@/app/_actions/follow/get-follower-this-user-id";
import { ResponseData } from "@/app/_lib/response-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = await getFollowerThisUserId(params.id as string);
  return NextResponse.json(await ResponseData(result, true));
}