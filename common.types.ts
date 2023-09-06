export type BuyBook = {
  bookid: number;
  quantity: number;
  path: string;
};

export type book = {
  bookid: number;
  book_name: string;
  available: number;
  image: string;
  sold_books: number;
};

export type SoldBooks = {
  bookid: number;
  book_name: string;
  available: number;
  quantity: number;
  time: Date;
};

export type form = {
  book_name: string;
  available: number;
  image: string;
  bookid: number;
};
