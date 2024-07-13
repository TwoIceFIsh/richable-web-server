import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import SessionContext from "@/app/_components/common/SessionContext";
import { Toaster } from "@/components/ui/sonner";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "리치에이블 - 로그인",
  description: "더 높은 성장을 위한 커뮤니티",
  openGraph: {
    images: "https://github.com/shadcn.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionContext>
      <html lang="en">
        <body
          className={cn(
            "h-full min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <div className={"h-full"}>{children}</div>
          <Toaster />
        </body>
      </html>
    </SessionContext>
  );
}