import React from "react";

import { getBookDetails } from "@/lib/actions/books";
import { book } from "@/common.types";
import TableComponent from "@/components/TableComponent";

const page = async () => {
  const allBooks: book[] = await getBookDetails();
  return (
    <div className="py-10">
      <h1 className="flex justify-center text-4xl font-semibold">All Books</h1>
      <div className="flex flex-wrap justify-center items-center gap-10 my-5">
        <TableComponent data={allBooks} />
      </div>
    </div>
  );
};

export default page;
