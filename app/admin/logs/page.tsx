"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { getLogs } from "@/app/_actions/admin/get-logs";
import MyDataTable from "@/app/_components/common/Mytable";

interface LogType {
  id: string;
  content: string;
  LogCategory: {
    id: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    logId: string | null;
  }[];
  createdAt: Date;
}

const columns: ColumnDef<LogType>[] = [
  {
    accessorKey: "createdAt",
    header: "생성일",
    cell: ({ row }) => {
      return <>{new Date(row.original.createdAt).toLocaleString()}</>;
    },
  },
  {
    accessorKey: "LogCategory",
    header: "타입",
    cell: ({ row }) => {
      return <>{row.original.LogCategory[0].type}</>;
    },
  },
  {
    accessorKey: "content",
    header: "내용",
  },
];

const LogsPage = () => {
  const [data, setLogs] = useState<LogType[]>([]);
  useEffect(() => {
    const fetchLogs = async () => {
      const res: LogType[] = await getLogs();
      if (res) setLogs(res);
    };
    fetchLogs().then();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>로그</CardTitle>
      </CardHeader>
      <CardContent>
        <MyDataTable
          columnDef={columns}
          myData={data}
          cardTitle={"로그"}
          cardDescription={"로그조회"}
          search={true}
          searchValue={"content"}
        />
      </CardContent>
    </Card>
  );
};

export default LogsPage;