"use client";
import React, { useContext, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormSuccess from "@/app/admin/_component/auth/form-success";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsSchema } from "@/app/_schemas/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import FormError from "@/app/admin/_component/auth/form-error";
import { settingsBasic } from "@/app/_actions/auth/settings-basic";
import { MySession } from "@/app/_components/common/SessionContext";

const SettingsPage = () => {
  const session = useContext(MySession);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session?.session?.name || undefined,
      email: session?.session?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: session?.session?.role || undefined,
      isTwoFactorEnabled: session?.session?.isTwoFactorEnabled || undefined,
    },
  });
  const [message, setMessage] = useState<string | undefined>();
  const [status, setStatus] = useState<"success" | "error" | undefined>();

  const onClick = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settingsBasic(values)
        .then((data) => {
          if (data) {
            if (data.error) {
              setMessage(data.error);
              setStatus("error");
            }
            if (data.success) {
              setMessage(data.success);
              setStatus("success");
            }
          }
        })
        .catch(() => {
          setMessage("An error occurred");
          setStatus("error");
        });
    });
  };

  return (
    <Card className={"w-[600px]"}>
      <CardHeader>
        <p className={"text-center text-2xl font-semibold"}>⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={"space-y-6"} onSubmit={form.handleSubmit(onClick)}>
            <div className={"space-y-4"}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"John Doe"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {session?.session?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={"John.Doe@example.com"}
                            disabled={isPending}
                            type={"email"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"password"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>기존 비밀번호</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={"******"}
                            disabled={isPending}
                            type={"password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"newPassword"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>변경할 비밀번호</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={"******"}
                            disabled={isPending}
                            type={"password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name={"role"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>권한</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"select a role"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {session?.session?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name={"isTwoFactorEnabled"}
                    render={({ field }) => (
                      <FormItem
                        className={
                          "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                        }
                      >
                        <div className={"space-y-0.5"}>
                          <FormLabel>Two Factor 인증</FormLabel>
                          <FormDescription>
                            Two Factor 인증을 통하여 로그인 하세요
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            {status === "error" && <FormError message={message as string} />}
            {status === "success" && (
              <FormSuccess message={message as string} />
            )}
            <Button type={"submit"} disabled={isPending}>
              SAVE
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;