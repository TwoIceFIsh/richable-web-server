"use server";
import db from "@/lib/db";

export const getThreadsTakeSkip = async (
  take: number,
  page: number,
  date?: Date,
) => {
  let data;
  if (!date)
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
  else {
    data = await db.thread.findMany({
      where: {
        t_createdAt: {
          gt: new Date(date as Date),
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
  return data;
};