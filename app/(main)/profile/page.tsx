"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserUpdateSchema } from "@/app/_schemas/user-update-schema";
import { toast } from "sonner";
import { updateUser } from "@/app/_actions/user/update-user";
import { BasicType } from "@/app/_type/basic-type";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/app/_actions/user/get-current-user";
import { getFollowersThisCurrentUser } from "@/app/_actions/follow/get-followers-this-current-user";
import { UserFollowerType } from "@/app/_type/user-follower-type";
import { MySession } from "@/app/_components/common/SessionContext";

// 비밀번호는 8자 이상 16자 이하여야 하며, 적어도 하나의 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.

const ProfilePage = () => {
  const session = useContext(MySession);

  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<BasicType<UserFollowerType>>();
  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser().then((data) => {
        setName(data?.data?.name as string);
        setEmail(data?.data?.email as string);
        setImage(data?.data?.image as string);
        setContent(data?.data?.content as string);
        form.reset({
          name: data?.data?.name as string,
          password: "" as string,
          image: data?.data?.image as string,
          content: data?.data?.content as string,
        });
      });
      await getFollowersThisCurrentUser().then((data) => {
        if (data !== null) setUser(data);
      });
    };
    fetchUser().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: "",
      password: "",
      image: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserUpdateSchema>) {
    await updateUser(values).then((res) => {
      if (res.success) toast.success(res.success);
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <div
      className={
        "flex w-full flex-col gap-2 pt-16 sm:grid sm:grid-cols-2 sm:flex-row sm:py-6 sm:pl-20 sm:pr-6"
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>계정정보</CardTitle>
          <CardDescription>자신의 정보를 수정합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>유저이름</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder="Richable"
                        onChangeCapture={(e) => setName(e.currentTarget.value)}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      대표적으로 표시되는 이름 입니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {session?.session?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        8자 이상 16자 이하, 대문자, 소문자, 숫자 및 특수문자
                        포함
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/*<FormField*/}
              {/*  control={form.control}*/}
              {/*  name="group"*/}
              {/*  render={({ field }) => (*/}
              {/*    <FormItem>*/}
              {/*      <FormLabel>소속</FormLabel>*/}
              {/*      <FormControl>*/}
              {/*        <Input*/}
              {/*          placeholder="나스닥최고"*/}
              {/*          {...field}*/}
              {/*          onChangeCapture={(e) => setGroup(e.currentTarget.value)}*/}
              {/*        />*/}
              {/*      </FormControl>*/}
              {/*      <FormDescription>*/}
              {/*        대표 소속을 표시해 보세요!*/}
              {/*      </FormDescription>*/}
              {/*      <FormMessage />*/}
              {/*    </FormItem>*/}
              {/*  )}*/}
              {/*/>*/}
              {/*<FormField*/}
              {/*  control={form.control}*/}
              {/*  name="tag"*/}
              {/*  render={({ field }) => (*/}
              {/*    <FormItem>*/}
              {/*      <FormLabel>칭호</FormLabel>*/}
              {/*      <FormControl>*/}
              {/*        <Input*/}
              {/*          placeholder="신비로운"*/}
              {/*          {...field}*/}
              {/*          onChangeCapture={(e) => setTag(e.currentTarget.value)}*/}
              {/*        />*/}
              {/*      </FormControl>*/}
              {/*      <FormDescription>개성있게 꾸며보세요</FormDescription>*/}
              {/*      <FormMessage />*/}
              {/*    </FormItem>*/}
              {/*  )}*/}
              {/*/>*/}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>로고</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <Input
                        placeholder={"https://example.com/logo.png"}
                        {...field}
                        onChangeCapture={(e) => setImage(e.currentTarget.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      로고 이미지 URL을 입력하세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <Input
                        placeholder={"안녕!"}
                        {...field}
                        onChangeCapture={(e) =>
                          setContent(e.currentTarget.value)
                        }
                      />
                    </FormControl>
                    <FormDescription>자신을 소개해보세요.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">저장하기</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>미리보기</CardTitle>
          <CardDescription>계정의 모습을 미리 봅니다</CardDescription>
        </CardHeader>
        .
        <CardContent
          className={"flex flex-col items-center justify-center gap-6"}
        >
          <Card className={"flex items-center justify-center"}>
            <CardHeader>
              <div
                className={
                  "flex select-none flex-row-reverse items-center gap-3"
                }
              >
                <div className={"flex flex-col"}>
                  <div className={"flex gap-2"}>
                    <div>
                      <a className={"font-bold"}>{name}</a>
                    </div>
                  </div>
                  <CardDescription className={"font-bold"}>
                    {email}
                  </CardDescription>
                </div>
                <Avatar className={"bg-white ring-4 ring-green-400"}>
                  <AvatarImage src={image || ""} />
                  <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
          </Card>
          <Card className={"w-4/5"}>
            <CardHeader className={"flex w-full"}>
              <div className={"flex items-center justify-between"}>
                <div>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>{email}</CardDescription>
                </div>
                <Avatar>
                  <AvatarImage src={image || ""} />
                  <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>{content}</CardContent>
            <CardFooter
              className={"flex flex-col items-start gap-3 text-start"}
            >
              <div className={"flex flex-row items-center gap-2"}>
                <div>팔로워 {user?.data?.Follower?.length}명</div>
                <div className={"flex"}>
                  {user?.data?.Follower?.slice(0, 10).map((one, key) => (
                    <Avatar
                      key={key}
                      className={cn(
                        `h-4 w-4 ring-2 ring-green-500`,
                        (user?.data?.Follower?.length as number) > 0 &&
                          "-mr-1.5",
                      )}
                    >
                      <AvatarFallback className={"font-bold"}></AvatarFallback>
                      <AvatarImage
                        src={one?.image}
                        alt={one?.email}
                      ></AvatarImage>
                    </Avatar>
                  ))}
                </div>
              </div>
              {clicked ? (
                <Button
                  className={"w-full rounded-xl text-lg font-bold"}
                  onClick={() => setClicked(false)}
                  variant={"secondary"}
                >
                  팔로잉
                </Button>
              ) : (
                <Button
                  className={"w-full rounded-xl text-lg font-bold"}
                  variant={"default"}
                  onClick={() => setClicked(true)}
                >
                  팔로우
                </Button>
              )}
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;