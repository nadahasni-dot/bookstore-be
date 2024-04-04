import {
  countAllOrdersByUserId,
  createNewOrder,
  createNewOrderItem,
  deleteOrderById,
  deleteOrderItemsByOrderId,
  getAllOrdersByUserId,
  getOrderdDetailById,
} from "../repository/order.repository";
import { getBookById } from "../repository/book.repository";
import { getUserById, updateBalancePoint } from "../repository/user.repository";

export type BookItem = {
  bookId: number;
  quantity: number;
};

export type FetchAllOrdersParam = {
  userId: number;
  page: string;
  perPage: string;
};

const fetchAllOrders = async ({
  userId,
  page,
  perPage,
}: FetchAllOrdersParam) => {
  try {
    const orders = await getAllOrdersByUserId({
      userId,
      page: Number(page),
      perPage: Number(perPage),
    });

    if (!orders || orders.length <= 0) {
      return {
        code: 404,
        success: false,
        message: "orders not found",
        data: [],
      };
    }

    const countOrders = await countAllOrdersByUserId(userId);
    const totalPage = Math.ceil(countOrders / Number(perPage));

    return {
      code: 200,
      success: true,
      message: "orders found",
      data: orders,
      meta: {
        page,
        perPage,
        totalPage,
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

const cancelOrderedItems = async (userId: number, orderId: number) => {
  try {
    const order = await getOrderdDetailById(orderId);
    const user = await getUserById(userId);

    if (!order) {
      return {
        code: 404,
        success: false,
        message: "Related order id not found",
        data: null,
      };
    }

    if (!user) {
      return {
        code: 404,
        success: false,
        message: "Related user id not found",
        data: null,
      };
    }

    const newBalance = user.point + order.paid;
    await updateBalancePoint(userId, newBalance);

    await deleteOrderItemsByOrderId(orderId);
    await deleteOrderById(orderId);

    return {
      code: 200,
      success: true,
      message: "Order cancelled, balance point updated",
      data: {
        ...user,
        point: newBalance,
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

export {
  fetchAllOrders,
  fetchOrderDetail,
  proceedCheckout,
  cancelOrderedItems,
};
