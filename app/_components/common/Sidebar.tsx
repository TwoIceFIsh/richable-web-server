"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useContext, useState } from "react";
import {
  BirdIcon,
  CalculatorIcon,
  HomeIcon,
  LogOutIcon,
  Menu,
  MessageCircle,
  PenLineIcon,
} from "lucide-react";
import MenuIcon from "@/app/_components/common/menu/MenuIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutBasic } from "@/app/_actions/auth/sign-out-basic";
import WriteModal from "@/app/_components/thread/WriteModal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GoGear } from "react-icons/go";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/app/_components/common/Acl";
import { MySession } from "@/app/_components/common/SessionContext";

interface SidebarProps {
  handleHomeIconClick?: () => void;
}

const Sidebar = ({ handleHomeIconClick }: SidebarProps) => {
  const session = useContext(MySession);
  const pathName = usePathname();
  const [writeModal, setWriteModal] = useState(false);
  return (
    <>
      <>
        {writeModal && (
          <div className={"z-40"}>
            <WriteModal setWriteModal={setWriteModal} writeModal={writeModal} />
          </div>
        )}

        <div
          className={
            "fixed hidden h-full w-[80px] shrink-0 select-none flex-col items-center justify-between py-10 sm:flex"
          }
        >
          <div className={"transition hover:scale-110"}>
            <MenuIcon href={"/"} onClick={handleHomeIconClick}>
              <BirdIcon
                className={"h-10 w-10 text-black"}
                color={process.env.NEXT_PUBLIC_PRIMARY_RGB}
              />
            </MenuIcon>
          </div>
          <div className={"flex flex-col items-center justify-center gap-y-4"}>
            {/*<MenuIcon href={"/house"} onClick={handleHomeIconClick}>*/}
            {/*  <HomeIcon*/}
            {/*    className={cn(*/}
            {/*      pathName === "/house" ? "text-black" : "",*/}
            {/*      "h-8 w-8",*/}
            {/*    )}*/}
            {/*  />*/}
            {/*</MenuIcon>*/}
            <MenuIcon href={"/"} onClick={handleHomeIconClick}>
              <MessageCircle
                className={cn(pathName === "/" ? "text-black" : "", "h-8 w-8")}
              />
            </MenuIcon>
            <MenuIcon href={"/calc"}>
              <CalculatorIcon
                className={cn(
                  pathName === "/calc" ? "text-black" : "",
                  "h-8 w-8",
                )}
              />
            </MenuIcon>

            <MenuIcon href={"/profile"}>
              <Avatar className={"ring-2 ring-green-500"}>
                <AvatarFallback className={"font-bold"}>
                  {session?.session?.email?.slice(0, 2)}
                </AvatarFallback>
                <AvatarImage
                  src={session?.session?.image}
                  alt={"s"}
                ></AvatarImage>
              </Avatar>
            </MenuIcon>
          </div>

          <div className={"flex flex-col gap-y-8"}>
            <div
              className={
                "text-gray-400 transition hover:cursor-pointer hover:text-black"
              }
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu className={"h-8 w-8"} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"ml-10 w-[200px]"}>
                  <DropdownMenuLabel className={"text-lg font-bold"}>
                    계정 정보
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <RoleGate allowedRole={UserRole.ADMIN}>
                    <Link href={"/admin"}>
                      <DropdownMenuItem
                        className={
                          "flex cursor-pointer justify-between text-lg font-bold"
                        }
                      >
                        <GoGear className={"h-6 w-6"} />
                        <div>관리페이지</div>
                      </DropdownMenuItem>
                    </Link>
                  </RoleGate>

                  <DropdownMenuItem
                    className={
                      "flex cursor-pointer justify-between text-lg font-bold text-red-600"
                    }
                    onClick={() => signOutBasic()}
                  >
                    <LogOutIcon className={"h-6 w-6"} />
                    <div>로그아웃</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </>
      <>
        {/* mobile top */}

        <div
          className={
            "fixed z-30 flex h-16 w-full select-none items-center justify-between bg-white px-4 transition sm:hidden"
          }
        >
          <div className={"flex-1"}></div>
          <MenuIcon
            href={"/"}
            className={"cursor-pointer"}
            onClick={handleHomeIconClick}
          >
            <BirdIcon className={"h-10 w-10 text-black"} />
          </MenuIcon>

          <div
            className={
              "flex flex-1 justify-end text-gray-400 transition hover:text-black"
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className={"h-8 w-8"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"mr-5 w-[200px]"}>
                <DropdownMenuLabel className={"text-lg font-bold"}>
                  계정 정보
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <RoleGate allowedRole={UserRole.ADMIN}>
                  <Link href={"/admin"}>
                    <DropdownMenuItem
                      className={
                        "flex cursor-pointer justify-between text-lg font-bold"
                      }
                    >
                      <GoGear className={"h-6 w-6"} />
                      <div>관리페이지</div>
                    </DropdownMenuItem>
                  </Link>
                </RoleGate>
                <DropdownMenuItem
                  className={
                    "cursor-pointer justify-between text-lg font-bold text-red-600"
                  }
                  onClick={() => signOutBasic()}
                >
                  <LogOutIcon />
                  <div>로그아웃</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </>
      {/* mobile bottom */}
      <>
        <div
          className={
            "fixed bottom-0 z-30 flex w-full shrink-0 select-none items-center justify-around bg-white sm:hidden"
          }
        >
          <MenuIcon
            href={"/"}
            className={"cursor-pointer"}
            onClick={handleHomeIconClick}
          >
            <HomeIcon className={"h-10 w-10 text-black"} />
          </MenuIcon>
          {/*<MenuIcon href={"/search"}>*/}
          {/*  <Search*/}
          {/*    className={cn(*/}
          {/*      pathName === "/search" ? "text-black" : "",*/}
          {/*      "h-8 w-8",*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</MenuIcon>*/}
          <MenuIcon onClick={() => setWriteModal(true)} href={"/123"}>
            <PenLineIcon className={cn("h-8 w-8")} />
          </MenuIcon>
          <MenuIcon href={"/calc"}>
            <CalculatorIcon className={cn("h-8 w-8")} />
          </MenuIcon>
          {/*<MenuIcon href={"/activity"}>*/}
          {/*  <Heart*/}
          {/*    className={cn(*/}
          {/*      pathName === "/activity" ? "text-black" : "",*/}
          {/*      "h-8 w-8",*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</MenuIcon>*/}
          <MenuIcon href={"/profile"}>
            <Avatar className={"ring-2 ring-green-500"}>
              <AvatarFallback className={"font-bold"}>
                {session?.session?.email?.slice(0, 2)}
              </AvatarFallback>
              <AvatarImage
                src={session?.session?.image}
                alt={"s"}
              ></AvatarImage>
            </Avatar>
          </MenuIcon>
        </div>
      </>
    </>
  );
};

export default Sidebar;