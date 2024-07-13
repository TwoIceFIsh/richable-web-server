import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { signUpBasic } from "@/app/_actions/auth/sign-up-basic";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { RegisterSchema } from "@/app/_schemas/register-schema";

interface SignupModalProps {
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupModal = ({ setSignUpModal }: SignupModalProps) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      signUpBasic(values).then((r) => {
        if (r.success) {
          toast(r.success);
          setSignUpModal(false);
        }
        if (r.error) {
          toast(r.error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      {isPending && <Loading />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-balance text-muted-foreground">
              경제적 자유를 위하여 자물쇠를 해제하여 주세요
            </p>
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="m@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      disabled={isPending}
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </div>
          <div className="mt-4 flex flex-col text-center text-sm">
            <div>기억이 나셨나요?</div>
            <div
              onClick={() => setSignUpModal(false)}
              className="cursor-pointer underline"
            >
              로그인하기
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignupModal;