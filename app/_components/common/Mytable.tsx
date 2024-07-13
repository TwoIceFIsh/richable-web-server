"use client";
import { download, generateCsv, mkConfig } from "export-to-csv";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, DownloadIcon, UserPlusIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface MyDataTableProps<T> {
  columnDef: ColumnDef<T>[];
  myData: T[];
  fileName?: string;
  cardTitle: string;
  cardDescription: string;
  searchValue?: string;
  search: boolean;
  selected?: boolean;
  newUser?: boolean;
}

export default function MyDataTable<T>({
  myData,
  columnDef,
  fileName = "my-data",
  cardTitle,
  cardDescription,
  searchValue = "",
  search = false,
  selected = false,
  newUser = false,
}: MyDataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: myData,
    columns: columnDef,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: fileName, // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  // export function
  // Note: change _ in Row<_>[] with your Typescript type.
  const exportExcel = (rows: Row<T>[]) => {
    const rowData = rows.map((row) => {
      // Convert Project to { [k: string]: AcceptedData; [k: number]: AcceptedData; }
      const data = row.original;
      return Object.fromEntries(
        //@ts-ignore
        Object.entries(data).map(([key, value]) => [key, String(value)]),
      );
    });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="flex items-center justify-between py-1">
              {search && (
                <Input
                  placeholder={`Filter ${searchValue}...`}
                  value={
                    (table
                      .getColumn(searchValue)
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(searchValue)
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              )}

              <div className={"flex items-center gap-2"}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table.getAllColumns().map((column) => {
                      // Check if the column ID is 'a' and set its initial visibility to false
                      // Ensure column visibility is set correctly on initial render

                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size={"icon"}
                  onClick={() => exportExcel(table.getFilteredRowModel().rows)}
                >
                  <DownloadIcon />
                </Button>
                {newUser && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="default" size={"icon"}>
                        <UserPlusIcon />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>신규 유저</SheetTitle>
                        <SheetDescription>
                          프로파일을 작성하여 신규 유저를 생성하세요!
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            이름
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            유저이름
                          </Label>
                          <Input
                            id="name"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">생성하기</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className={"font-bold"}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columnDef.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {selected && (
                  <div>
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                )}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}