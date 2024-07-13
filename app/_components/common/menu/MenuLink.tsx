import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

const MenuLink = ({
  children,
  href,
  className,
  active,
  onClick,
}: MenuLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        className,
        "text-nowrap px-1 transition-transform duration-300 hover:scale-105",
        active && "rounded-lg border border-black bg-black px-1 text-white",
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MenuLink;