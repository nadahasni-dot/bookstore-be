import { prisma } from "../../prisma/prisma.client";

type GetAllBooksParam = {
  perPage: number;
  page: number;
  query?: string;
  tags?: string[];
};

const getAllBooks = async ({
  perPage,
  page,
  query,
  tags,
}: GetAllBooksParam) => {
  let queryArgs = {};

  if (query !== undefined && query.length > 0) {
    queryArgs = {
      ...queryArgs,
      title: {
        contains: query,
      },
    };
  }

  if (tags !== undefined && tags.length > 0) {
    queryArgs = {
      ...queryArgs,
      bookTags: {
        some: {
          tag: {
            OR: tags.map((name) => ({
              name,
            })),
          },
        },
      },
    };
  }

  return await prisma.book.findMany({
    skip: page === 1 ? 0 : (page - 1) * perPage,
    take: perPage,
    include: {
      bookTags: {
        include: { tag: {} },
      },
    },
    where: {
      ...queryArgs,
    },
  });
};

export { getAllBooks };
