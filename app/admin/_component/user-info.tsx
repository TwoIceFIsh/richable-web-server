import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label?: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className={"w-[600px] shadow-md"}>
      <CardHeader>
        <p className={"text-center text-2xl font-bold"}>{label}</p>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          }
        >
          <p className={"text-sm font-medium"}>ID</p>
          <p className={"max-w-[180px] truncate rounded-md text-sm"}>
            {user?.id}
          </p>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          }
        >
          <p className={"text-sm font-medium"}>NAME</p>
          <p className={"max-w-[180px] truncate rounded-md text-sm"}>
            {user?.name}
          </p>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          }
        >
          <p className={"text-sm font-medium"}>EMAIL</p>
          <p className={"max-w-[180px] truncate rounded-md text-sm"}>
            {user?.email}
          </p>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          }
        >
          <p className={"text-sm font-medium"}>ROLE</p>
          <p className={"max-w-[180px] truncate rounded-md text-sm"}>
            {user?.role}
          </p>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          }
        >
          <p className={"text-sm font-medium"}>Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};