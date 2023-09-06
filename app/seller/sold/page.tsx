import React from "react";
import TableComponent from "@/components/TableComponent";
import { getSoldBooks } from "@/lib/actions/books";
import { SoldBooks } from "@/common.types";

const page = async () => {
  const sold_Books = await getSoldBooks();
  return (
    <div className="py-10">
      <h1 className="flex justify-center text-4xl font-semibold">
        Sold Books with Time
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-10 my-10">
        <TableComponent data={sold_Books} />
      </div>
    </div>
  );
};

export default page;
