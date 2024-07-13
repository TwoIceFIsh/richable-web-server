"use client";

import { UserRole } from "@prisma/client";
import React, { useContext } from "react";
import { MySession } from "@/app/_components/common/SessionContext";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const session = useContext(MySession);

  if (session?.session?.role !== allowedRole) {
    return <></>;
  }

  return <>{children}</>;
};