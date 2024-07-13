"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/app/admin/_component/auth/user-button";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div
      className={
        "flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm"
      }
    >
      <div className={"flex gap-x-2"}>
        <Button
          asChild
          variant={pathName === "/admin" ? "default" : "secondary"}
        >
          <Link href={"/admin"}>Home</Link>
        </Button>

        <Button
          asChild
          variant={pathName === "/admin/settings" ? "default" : "secondary"}
        >
          <Link href={"/admin/settings"}>Settings</Link>
        </Button>

        <Button
          asChild
          variant={pathName === "/admin/init" ? "default" : "secondary"}
        >
          <Link href={"/admin/init"}>Init</Link>
        </Button>

        <Button
          asChild
          variant={pathName === "/admin/logs" ? "default" : "secondary"}
        >
          <Link href={"/admin/logs"}>Logs</Link>
        </Button>
        {/*<Button*/}
        {/*  asChild*/}
        {/*  variant={pathName === "/admin/users" ? "default" : "secondary"}*/}
        {/*>*/}
        {/*  <Link href={"/admin/users"}>users</Link>*/}
        {/*</Button>*/}
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;