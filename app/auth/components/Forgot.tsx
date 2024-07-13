import React, { useTransition } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { ResetSchema } from "@/app/_schemas/settings-schema";
import { actionForgotPassword } from "@/app/_actions/auth/action-forgot-password";

interface SigninModalProps {
  setForgotModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotModal = ({ setForgotModal }: SigninModalProps) => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ResetSchema>) {
    startTransition(() => {
      actionForgotPassword(values).then((r) => {
        if (r.success) {
          toast.success(r.success);
          setForgotModal(false);
        }

        if (r.error) {
          toast.error(r.error);
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
            <h1 className="cursor-pointer text-3xl font-bold">비밀번호 찾기</h1>
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
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              임시 비밀번호 발급
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            기억이 나셨나요?{" "}
            <div
              onClick={() => setForgotModal(false)}
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

export default ForgotModal;