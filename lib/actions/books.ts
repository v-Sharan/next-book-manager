"use server";

import { revalidatePath } from "next/cache";

import { BuyBook, book, form } from "@/common.types";
import { query } from "../connect";

export const BuyBooks = async ({ bookid, quantity, path }: BuyBook) => {
  if (!bookid && !quantity) {
    throw new Error("Quantity is important");
  }

  try {
    const data = await query({
      sql: `SELECT available FROM books WHERE bookid=${bookid}`,
    });

    if (data[0].available <= 0) {
      throw new Error("Insufficient books,may try later");
    }

    await query({
      sql: "INSERT INTO sold_books (bookid,quantity) VALUES (?,?)",
      values: [bookid, quantity],
    });

    await query({
      sql: "UPDATE books SET available=?,sold_books=? WHERE bookid=?",
      values: [data[0].available - quantity, quantity, bookid],
    });
    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getBooks = async () => {
  try {
    const data = await query({ sql: "SELECT * FROM books" });
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getSoldBooks = async () => {
  try {
    const data = await query({
      sql: "SELECT books.bookid,books.book_name,books.available,sold_books.quantity,sold_books.time FROM books INNER JOIN sold_books ON books.bookid=sold_books.bookid",
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
      sql: "SELECT books.bookid,books.book_name,books.available,sold_books.quantity,sold_books.time FROM books INNER JOIN sold_books ON books.bookid=sold_books.bookid",
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

export const getBookDetails = async () => {
  try {
    const data = await query({
      sql: "SELECT * from books",
    });
    return data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const deleteBookById = async ({
  bookid,
  path,
}: {
  bookid: number;
  path: string;
}) => {
  try {
    await query({
      sql: "DELETE FROM `books` WHERE bookid = ?",
      values: [bookid],
    });
    await query({
      sql: "DELETE FROM `sold_books` WHERE bookid = ?",
      values: [bookid],
    });
    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getBookById = async ({ bookid }: { bookid: number }) => {
  try {
    const data = await query({
      sql: "SELECT * FROM books WHERE bookid = ?",
      values: [bookid],
    });
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const updateBook = async ({
  book_name,
  available,
  image,
  bookid,
  path,
}: {
  book_name: string;
  available: number;
  image: string;
  bookid: number;
  path: string;
}) => {
  try {
    await query({
      sql: "UPDATE books SET book_name=?,available=?,image=? WHERE bookid=?",
      values: [book_name, Number(available), image, bookid],
    });
    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
