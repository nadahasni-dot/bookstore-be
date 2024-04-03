import { prisma } from "../../prisma/prisma.client";

type CreateNewOrderParam = {
  userId: number;
  total: number;
  paid: number;
};

type CreateNewOrderItemParam = {
  orderId: number;
  bookId: number;
  quantity: number;
  subTotal: number;
};

const getAllOrdersByUserId = async (id: number) => {
  return await prisma.order.findMany({
    include: {
      orderItems: {
        select: {
          quantity: true,
          subTotal: true,
          book: true,
        },
      },
    },
    where: { userId: id },
  });
};

const getOrderdDetailById = async (id: number) => {
  return await prisma.order.findFirst({
    where: { id },
    include: {
      orderItems: {
        select: {
          quantity: true,
          subTotal: true,
          book: true,
        },
      },
    },
  });
};

const createNewOrder = async ({ userId, total, paid }: CreateNewOrderParam) => {
  return await prisma.order.create({
    data: {
      userId,
      total,
      paid,
    },
  });
};

const createNewOrderItem = async ({
  orderId,
  bookId,
  quantity,
  subTotal,
}: CreateNewOrderItemParam) => {
  return await prisma.orderItem.create({
    data: {
      orderId,
      bookId,
      quantity,
      subTotal,
    },
  });
};

export {
  getAllOrdersByUserId,
  getOrderdDetailById,
  createNewOrder,
  createNewOrderItem,
};
