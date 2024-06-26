import { prisma } from "../../prisma/prisma.client";

interface GetAllBooksParam {
  perPage: number;
  page: number;
  query?: string;
  tags?: string[];
}

interface CountAllBooksByQueryAndTagsParam {
  query?: string;
  tags?: string[];
}

const countAllBooksByQueryAndTags = async ({
  query,
  tags,
}: CountAllBooksByQueryAndTagsParam) => {
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

  return await prisma.book.count({ where: { ...queryArgs } });
};

const getBookById = async (id: number) => {
  return await prisma.book.findFirst({
    where: { id },
    include: {
      bookTags: {
        select: {
          tag: true,
        },
      },
    },
  });
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
        select: {
          tag: true,
        },
      },
    },
    where: {
      ...queryArgs,
    },
  });
};

export { getAllBooks, getBookById, countAllBooksByQueryAndTags };
