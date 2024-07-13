"use client";
import React, { useEffect, useState } from "react";
import { verifyTokenId } from "@/app/_actions/auth/token/check-token-verify-by-token";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const VerifyPage = ({ params }: { params: { token: string } }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const check = async () => {
      const result = await verifyTokenId(params.token);
      if (result) {
        setTitle(result.message.title);
        setDescription(result.message.description);
      }
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="h-full w-full select-none lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-primary lg:block">
        <div
          className={
            "flex h-full flex-col justify-around p-10 text-primary-foreground"
          }
        >
          <div className={"flex flex-col gap-2 text-center"}>
            <p className={"text-4xl font-bold"}>리치에이블</p>
            <p>더 높은 성장을 위한 커뮤니티</p>
          </div>
          <div className={"text-md"}>
            <p>
              대부분의 사람들은 남들이 주식에 관심을 보이고 있을 때 흥미를 갖곤
              한다.
              <br />
              하지만 주식에 관심을 가져야 할 땐 아무도 거들떠 보지 않을 때다.
              <br />
              <br />
              <br />
              평소엔 인기도 있으면서 잘 나가는 주식은 살 수 없기 때문이다.
            </p>
            <br />
            <p className={"text-sm font-bold"}>- 워렌버핏 -</p>
          </div>
        </div>
      </div>
      <div className={"flex flex-col justify-center gap-10 p-10"}>
        <div className={"text-center text-2xl font-bold"}>
          리치에이블 인증시스템
        </div>
        <div className={"flex flex-col gap-5"}>
          <Card>
            <CardHeader
              className={cn(
                title === "인증 성공" && "bg-green-500",
                title === "인증 실패" && "bg-red-500",
                title === "인증 만료" && "bg-yellow-500",
                "font-bold text-primary-foreground",
              )}
            >
              {title}
            </CardHeader>
            <CardContent className={"py-10"}>
              <div>{description}</div>
            </CardContent>
            <CardFooter>
              <Link href={"/"}>
                <Button>홈으로</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;