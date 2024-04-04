import { prisma } from "../../prisma/prisma.client";

interface CreateNewOrderParam {
  userId: number;
  total: number;
  paid: number;
}

interface CreateNewOrderItemParam {
  orderId: number;
  bookId: number;
  quantity: number;
  subTotal: number;
}

interface GetAllOrdersParam {
  userId: number;
  page: number;
  perPage: number;
}

const countAllOrdersByUserId = async (userId: number) => {
  return await prisma.order.count({
    where: { userId },
  });
};

const getAllOrdersByUserId = async ({
  userId,
  page,
  perPage,
}: GetAllOrdersParam) => {
  return await prisma.order.findMany({
    skip: page === 1 ? 0 : (page - 1) * perPage,
    take: perPage,
    include: {
      orderItems: {
        select: {
          quantity: true,
          subTotal: true,
          book: true,
        },
      },
    },
    where: { userId },
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

const deleteOrderById = async (id: number) => {
  return await prisma.order.delete({
    where: { id },
  });
};

const deleteOrderItemsByOrderId = async (orderId: number) => {
  return await prisma.orderItem.deleteMany({
    where: { orderId },
  });
};

export {
  getAllOrdersByUserId,
  getOrderdDetailById,
  createNewOrder,
  createNewOrderItem,
  deleteOrderById,
  deleteOrderItemsByOrderId,
  countAllOrdersByUserId,
};
