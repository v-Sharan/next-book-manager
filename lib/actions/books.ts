"use server";

import { revalidatePath } from "next/cache";

import { BuyBook, book } from "@/common.types";
import { query } from "../connect";

export const BuyBooks = async ({ bookid, quantity, path }: BuyBook) => {
  if (!bookid && !quantity) {
    throw new Error("Quantity is important");
  }

  try {
    const data = await query({
      query: `SELECT availability FROM books WHERE bookid=${bookid}`,
    });

    if (data[0].availability <= 0) {
      throw new Error("Insufficient books,may try later");
    }

    await query({
      query: "INSERT INTO sold_books (bookid,quantity) VALUES (?,?)",
      values: [bookid, quantity],
    });

    await query({
      query: "UPDATE books SET availability=? WHERE bookid=?",
      values: [data[0].availability - quantity, bookid],
    });
    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getBooks = async () => {
  try {
    const data = await query({ query: "SELECT * FROM books" });
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getSoldBooks = async () => {
  try {
    const data = await query({
      query:
        "SELECT books.bookid,books.book_name,books.availability,sold_books.quantity,sold_books.time FROM books INNER JOIN sold_books ON books.bookid=sold_books.bookid",
    });
    if (data.length === 0) {
      throw new Error("No books sold");
    }
    return data;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const getSoldBookById = async ({ bookid }: { bookid: number }) => {
  try {
    const data = await query({
      query:
        "SELECT books.bookid,books.book_name,books.availability,sold_books.quantity,sold_books.time FROM books INNER JOIN sold_books ON books.bookid=sold_books.bookid",
    });

    const bybookid = data.filter((book: book) => book.bookid == bookid);

    if (bybookid.length === 0) {
      throw new Error("No Books sold");
    }

    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
