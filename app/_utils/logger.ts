"use server";
import db from "@/lib/db";
import { currentUser } from "@/app/_lib/current-user";

export const logger = async (type: string, content: string) => {
  const user = await currentUser();
  if (!user) {
    await db.log.create({
      data: {
        content: content,
        LogCategory: {
          create: {
            type: type,
          },
        },
      },
    });
  } else
    await db.log.create({
      data: {
        content: content,
        LogCategory: {
          create: {
            type: type,
          },
        },
        UserLog: {
          create: {
            userId: user.id as string,
          },
        },
      },
    });
};