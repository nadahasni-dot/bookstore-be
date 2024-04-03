import { getAllBooks, getBookById } from "../repository/book.repository";

type FetchBookParam = {
  page: string;
  perPage: string;
  query: string;
  tags: string;
};

const fetchBook = async (id: string) => {
  try {
    const book = await getBookById(Number(id));

    if (!book) {
      return {
        code: 404,
        success: false,
        message: "book not found",
        data: null,
      };
    }

    return {
      code: 200,
      success: true,
      message: "book found",
      data: book,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const fetchBooks = async ({ page, perPage, query, tags }: FetchBookParam) => {
  try {
    const allTags = tags.length < 1 ? [] : tags.split(",");

    const books = await getAllBooks({
      page: Number(page),
      perPage: Number(perPage),
      query,
      tags: allTags,
    });

    if (!books || books.length === 0) {
      return {
        code: 404,
        success: false,
        message: "book not found",
        data: [],
      };
    }

    return {
      code: 200,
      success: true,
      message: "books found",
      data: books,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export { fetchBooks, fetchBook };
