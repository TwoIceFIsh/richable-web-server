"use server";

import db from "@/lib/db";

export const updateThreadView = async (t_id: string, u_id: string) => {
  const data = await db.threadView.findFirst({
    where: {
      t_id: t_id,
      u_id: u_id,
    },
  });
  if (data) {
    return;
  }

  await db.threadView.create({
    data: {
      t_id: t_id,
      u_id: u_id,
    },
  });
};