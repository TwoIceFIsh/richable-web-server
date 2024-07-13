"use client";
import { useState } from "react";
import SigninModal from "@/app/auth/components/Signin";
import ForgotModal from "@/app/auth/components/Forgot";
import SignupModal from "@/app/auth/components/Signup";
import "../globals.css";

export default function LoginPage() {
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [forgotModal, setForgotModal] = useState<boolean>(false);

  return (
    <div className="h-full w-full select-none lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex h-full items-center justify-center">
        {!signUpModal && !forgotModal && (
          <SigninModal
            setSignUpModal={setSignUpModal}
            setForgotModal={setForgotModal}
          />
        )}

        {/* SignUp Component */}
        {signUpModal && <SignupModal setSignUpModal={setSignUpModal} />}

        {/* ForgotPassword Component */}
        {forgotModal && <ForgotModal setForgotModal={setForgotModal} />}
      </div>
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
    </div>
  );
}