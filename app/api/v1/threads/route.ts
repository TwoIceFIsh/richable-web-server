import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ResponseData } from "@/app/_lib/response-data";

export async function POST(request: NextRequest) {
  const { take = 3, page = 1, date = null } = await request.json();
  let data;
  if (!date) {
    data = await db.thread.findMany({
      take: Number(take),
      skip: Number(take) * Number(page),
      orderBy: {
        t_createdAt: "desc",
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
  } else {
    data = await db.thread.findMany({
      where: {
        t_createdAt: {
          gt: new Date(date),
        },
      },
      orderBy: {
        t_createdAt: "desc",
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
  }
  return NextResponse.json(await ResponseData(data, true));
}