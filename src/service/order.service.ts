import { Book } from "@prisma/client";
import {
  createNewOrder,
  createNewOrderItem,
  getAllOrdersByUserId,
  getOrderdDetailById,
} from "../repository/order.repository";
import { getBookById } from "../repository/book.repository";
import { getUserById, updateBalancePoint } from "../repository/user.repository";

export type BookItem = {
  bookId: number;
  quantity: number;
};

const fetchAllOrders = async (id: number) => {
  try {
    const orders = await getAllOrdersByUserId(id);

    if (!orders || orders.length <= 0) {
      return {
        code: 404,
        success: false,
        message: "orders not found",
        data: [],
      };
    }

    return {
      code: 200,
      success: true,
      message: "orders found",
      data: orders,
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

const fetchOrderDetail = async (id: string) => {
  try {
    const order = await getOrderdDetailById(Number(id));

    if (!order) {
      return {
        code: 404,
        success: false,
        message: "order not found",
        data: null,
      };
    }

    return {
      code: 200,
      success: true,
      message: "order found",
      data: order,
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

const proceedCheckout = async (userId: number, items: BookItem[]) => {
  try {
    if (items.length <= 0) {
      return {
        code: 400,
        success: false,
        message: "There are no products to be checkout",
        data: null,
      };
    }
    // Calculate Balance
    const user = await getUserById(userId);

    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const purchasedItems = [];

    // Calculate Total
    for (const item of items) {
      const { bookId, quantity } = item;
      const book = await getBookById(bookId);

      if (book) {
        purchasedItems.push({
          book,
          quantity: quantity,
          subTotal: book.price * quantity,
        });
      }
    }

    const total = purchasedItems.reduce(
      (accumulator, current) => accumulator + current.subTotal,
      0
    );

    // Guard if insufficent balance point
    if (user.point < total) {
      return {
        code: 400,
        success: false,
        message: "Insufficent balance point",
        data: null,
      };
    }

    const order = await createNewOrder({
      userId,
      total,
      paid: total,
    });

    for (const item of purchasedItems) {
      const { quantity, subTotal, book } = item;

      await createNewOrderItem({
        quantity,
        subTotal,
        bookId: book.id,
        orderId: order.id,
      });
    }

    const newBalancePoint = user.point - total;
    await updateBalancePoint(userId, newBalancePoint);

    return {
      code: 200,
      success: true,
      message: "Checkout success",
      data: {
        ...order,
        purchasedItems,
      },
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

export { fetchAllOrders, fetchOrderDetail, proceedCheckout };
