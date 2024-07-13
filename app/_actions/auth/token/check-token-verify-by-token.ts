"use server";
import db from "@/lib/db";
import {
  getMailContent,
  MailContent,
  transporter,
} from "@/app/_utils/send-mail";
import { createTokenByEmail } from "@/app/_actions/auth/token/create-token-by-email";

/**
 * verifyTokenId - 토큰을 사용하여 이메일 인증을 확인합니다.
 *
 * @param token - 토큰
 * */
export const verifyTokenId = async (token: string) => {
  const validToken = await db.verificationToken.findFirst({
    where: {
      token: token,
    },
  });

  // 토큰 유효성 검사
  if (validToken) {
    const tokenDate = validToken.expires;
    const todayDate = new Date();

    if (tokenDate < todayDate) {
      if (validToken?.identifier) {
        const deleteToken = await db.verificationToken.delete({
          where: {
            identifier_token: { identifier: validToken.identifier, token },
          },
        });
        if (deleteToken) {
          const token = await createTokenByEmail(validToken.identifier);

          const mailContent: MailContent = {
            subject: "[인증] 리치에이블 이메일 인증을 해주세요",
            html: `<div> 아래 링크를 클릭하여 인증하세요. <br> <a href="${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/verify/${token.token}">${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/verify/${token.token}</a> </div>`,
            to: validToken.identifier,
          };

          await transporter.sendMail(getMailContent(mailContent));
          return {
            result: false,
            message: {
              title: "인증 만료",
              description: "인증이 만료되어 다시 이메일을 발송 했습니다.",
            },
          };
        }
      }
    } else {
      // 토큰 기간 준수
      const data = await db.user.update({
        where: {
          email: validToken.identifier,
        },
        data: {
          emailVerified: new Date(),
          isActivated: true,
        },
      });

      if (data) {
        await db.verificationToken.delete({
          where: {
            identifier_token: { identifier: validToken.identifier, token },
          },
        });
        return {
          result: true,
          message: {
            title: "인증 성공",
            description: "여정에 합류하신 것을 환영합니다.",
          },
        };
      }
    }
  } else {
    // 토큰 유효성 검사 실패
    return {
      result: false,
      message: {
        title: "인증 실패",
        description: "유효하지 않은 토큰 입니다.",
      },
    };
  }
};