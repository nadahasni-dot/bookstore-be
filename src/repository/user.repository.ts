import { prisma } from "../../prisma/prisma.client";

type InsertUserParam = {
  name: string;
  email: string;
  point: number;
  password: string;
};

const insertUser = async ({
  name,
  email,
  password,
  point,
}: InsertUserParam) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      point,
    },
  });
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email },
  });
};

export { insertUser, getUserByEmail };
