import { Request, Response } from "express";
import { fetchBook, fetchBooks } from "../service/book.service";

const getBooks = async (req: Request, res: Response) => {
  const { page = "1", perPage = "10", query = "", tags = "" } = req.query;

  const result = await fetchBooks({
    page: page as string,
    perPage: perPage as string,
    query: query as string,
    tags: tags as string,
  });

  res.send(result).status(result.code);
};

const getBookDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await fetchBook(id);

  res.send(result).status(result.code);
};

export { getBooks, getBookDetail };
