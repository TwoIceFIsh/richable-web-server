"use client";

import { UserRole } from "@prisma/client";
import React, { useContext } from "react";
import FormError from "@/app/admin/_component/auth/form-error";
import { MySession } from "@/app/_components/common/SessionContext";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const session = useContext(MySession);

  if (session?.session?.role !== allowedRole) {
    return (
      <FormError message={"You do not have permission to view this content!"} />
    );
  }

  return <>{children}</>;
};