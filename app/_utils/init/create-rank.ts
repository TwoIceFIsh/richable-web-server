"use server";

import db from "@/lib/db";
import { RankData } from "@/app/_data/rankData";

/**
 * createRank - 랭킹을 생성합니다.
 */
export const createRank = async () => {
  const result = await db.rank.deleteMany();
  if (result) {
    const data = await db.rank.createMany({
      data: RankData,
    });
    if (data) return { success: "Created ranks" };
  }
  return { error: "Error creating ranks" };
};