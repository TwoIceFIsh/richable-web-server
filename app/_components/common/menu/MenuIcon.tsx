import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuIconProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  noLink?: boolean;
}

const MenuIcon = ({
  children,
  className,
  href = "/#",
  onClick,
}: MenuIconProps) => {
  const path = usePathname();
  if ((path === "/" && href === "/") || href === "/123")
    return (
      <div
        onClick={onClick}
        className={cn(
          className,
          "flex h-16 w-16 items-center justify-center rounded-lg text-gray-400 transition hover:cursor-pointer hover:bg-stone-200",
        )}
      >
        {children}
      </div>
    );

  return (
    <Link href={href as string}>
      <div
        className={cn(
          className,
          "flex h-16 w-16 items-center justify-center rounded-lg text-gray-400 transition hover:cursor-pointer hover:bg-stone-200",
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default MenuIcon;