import "../globals.css";
import React from "react";
import Sidebar from "@/app/_components/common/Sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  handleHomeIconClick?: () => void;
}

const MainLayout = ({
  children,
  handleHomeIconClick,
}: ProtectedLayoutProps) => {
  return (
    <>
      <div className={"flex h-full w-full"}>
        <Sidebar handleHomeIconClick={handleHomeIconClick} />
        {children}
      </div>
    </>
  );
};

export default MainLayout;