import { getBooks } from "@/lib/actions/books";

import { book } from "@/common.types";
import CustomCard from "@/components/CustomCard";

const Home = async () => {
  const allBooks = await getBooks();

  return (
    <div className="py-10">
      <h1 className="flex justify-center text-4xl font-semibold">All Books</h1>
      <div className="flex flex-wrap justify-center items-center gap-10 my-10">
        {allBooks.length !== 0 &&
          allBooks.map((book: book) => (
            <CustomCard key={book.bookid} {...book} />
          ))}
      </div>
    </div>
  );
};

export default Home;
