import React, { useEffect, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { loginBasic } from "@/app/_actions/auth/login-basic";
import { socialLogin } from "@/app/_actions/auth/login-social";
import { SignInSchema } from "@/app/_schemas/sign-in-schema";

interface SigninModalProps {
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigninModal = ({ setSignUpModal, setForgotModal }: SigninModalProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(async () => {
      await loginBasic(values).then((r) => {
        if (r?.error) {
          toast.error(r.error as string);
        }
      });
    });
  }

  // 3. OAuth login handler
  const path = useSearchParams();
  useEffect(() => {
    if (path.get("error") === "OAuthAccountNotLinked") {
      toast.error("같은 이메일 주소가 이미 가입되어 있습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async (provider: "google" | "github" | "kakao") => {
    startTransition(async () => {
      await socialLogin(provider).then();
    });
  };

  return (
    <Form {...form}>
      {isPending && <Loading />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">로그인</h1>
            <p className="text-balance text-muted-foreground">
              경제적 자유를 위하여 자물쇠를 해제하여 주세요
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <div
                onClick={() => {
                  setForgotModal(true);
                }}
                className="ml-auto inline-block cursor-pointer text-sm underline"
              >
                비밀번호 찾기
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              로그인
            </Button>

            <div className={"flex flex-col gap-2"}>
              <div className="relative flex items-center pt-4">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink text-xs text-gray-400">
                  소셜 로그인
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className={"flex gap-2"}>
                <Button
                  variant="outline"
                  type={"button"}
                  className="w-full gap-2"
                  onClick={() => onClick("google")}
                >
                  <FaGoogle className={"h-6 w-6"} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?{" "}
            <div
              onClick={() => setSignUpModal(true)}
              className="cursor-pointer underline"
            >
              가입하기
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SigninModal;