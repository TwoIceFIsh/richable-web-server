import React from "react";
import { currentUser } from "@/app/_lib/current-user";
import { UserInfo } from "@/app/admin/_component/user-info";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label={"🖥️ Server component"} />;
};

export default ServerPage;