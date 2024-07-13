"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import "../../globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ClacSchema = z.object({
  data: z.number(),
});

const CalcPage = () => {
  const [isPending, startTransition] = useTransition();
  const [earnMoney, setEarnMoney] = useState<number>(0);
  const [myMoney, setMyMoney] = useState<number>(0);
  const form = useForm<z.infer<typeof ClacSchema>>({
    resolver: zodResolver(ClacSchema),
    defaultValues: {},
  });

  const calc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = Number(e.target.value);
    setEarnMoney(data);
    startTransition(() => {
      if (data < 2500000) setMyMoney(0);
      else setMyMoney(((data - 2500000) * 22) / 100);
    });
  };

  return (
    <div
      className={
        "flex w-full flex-col gap-2 pt-16 sm:grid sm:grid-cols-1 sm:flex-row sm:py-6 sm:pl-20 sm:pr-6"
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>미국주식 양도소득세 계산기</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className={"mb-10 space-y-6"}>
              <FormField
                control={form.control}
                name={"data"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>올해수익</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"금액을 입력하여 주세요"}
                        type={"number"}
                        onChangeCapture={calc}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className={"flex flex-col gap-2"}>
            <div>
              올해 수익 <Badge>{formatNumber(earnMoney)}</Badge>원에 대한 주식등
              양도소득세는{" "}
              <Badge variant={"destructive"}>{formatNumber(myMoney)}</Badge>원
              입니다.
            </div>
            <CardDescription>
              *계산식 = (올해 수익 - 2,500,000) * 22%
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalcPage;

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};