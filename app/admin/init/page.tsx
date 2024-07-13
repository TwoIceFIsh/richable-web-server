"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createRank } from "@/app/_utils/init/create-rank";

const InitPage = () => {
  const initRank = () => {
    createRank().then((data) => {
      if (data.error) {
        toast.success(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Card className={"w-[600px]"}>
      <CardHeader>
        <CardTitle>🚀 Init</CardTitle>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
          }
        >
          <a className={"tesm font-medium"}>Rank 초기화</a>
          <Button onClick={initRank}>확인</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InitPage;