"use server";
import db from "@/lib/db";

export const getLogs = async () => {
  return db.log.findMany({
    include: {
      LogCategory: true,
    },
  });
};