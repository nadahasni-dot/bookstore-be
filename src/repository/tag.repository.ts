import { prisma } from "../../prisma/prisma.client";

const getAllTags = async () => {
  return await prisma.tag.findMany();
};

export { getAllTags };
