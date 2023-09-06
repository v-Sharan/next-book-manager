"use client";

import { SoldBooks, book } from "@/common.types";
import { DataTable } from "./DataTable";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { deleteBookById } from "@/lib/actions/books";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

dayjs.extend(localizedFormat);

const TableComponent = ({ data }: { data: SoldBooks[] | book[] }) => {
  const router = useRouter();
  const path = usePathname();

  const BooksColumn: ColumnDef<any>[] = [
    {
      accessorKey: "bookid",
      header: "No",
    },
    {
      accessorKey: "book_name",
      header: "Book Name",
      cell: ({ row }) => {
        const name: string = row.getValue("book_name");
        return <p>{name.slice(0, 15) + "..."}</p>;
      },
    },
    {
      accessorKey: "available",
      header: "Available",
    },
    {
      accessorKey: "sold_books",
      header: "Sold Books",
    },
    {
      header: "Edit",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => {
              router.push(`/seller/edit/${row.getValue("bookid")}`);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      header: "Delete",
      cell: ({ row }) => {
        return (
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteBookById({ bookid: row.getValue("bookid"), path });
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "bookid",
      header: "Id",
    },
    {
      accessorKey: "book_name",
      header: "Book Name",
    },
    {
      accessorKey: "available",
      header: "Available",
    },
    {
      accessorKey: "quantity",
      header: "Sold Books",
    },
    {
      accessorKey: "time",
      header: "Sold Books",
      cell: ({ row }) => {
        const date = new Date(row.getValue("time"));
        const dayjsFormat = dayjs(date).format("MMM D YYYY LT");

        return <p>{dayjsFormat}</p>;
      },
    },
  ];

  return (
    <div className="container flex items-center justify-center py-10 w-[725px] max-small:w-[550px]">
      <DataTable
        columns={path === "/seller" ? BooksColumn : column}
        data={data}
      />
    </div>
  );
};

export default TableComponent;
