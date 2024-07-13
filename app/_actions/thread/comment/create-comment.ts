"use server";

import db from "@/lib/db";

export const createComment = async (
  t_id: string,
  u_id: string,
  c_content: string,
) => {
  const userExists = await db.user.findUnique({
    where: { id: u_id },
  });
  if (!userExists) {
    throw new Error("User not found");
  }
  return db.comments.create({
    data: {
      c_content: c_content,
      t_id: t_id,
      u_id: u_id,
    },
    include: {
      c_user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};