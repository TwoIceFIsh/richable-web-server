import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/app/_lib/response-data";
import { getUserTypeByUserId } from "@/app/_actions/user/get-user-type-by-id";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = await getUserTypeByUserId(params.id as string);
  return NextResponse.json(await ResponseData(result, true));
}