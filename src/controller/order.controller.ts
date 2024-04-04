import { Request, Response } from "express";
import { CustomRequest } from "../middleware/auth.middleware";
import {
  BookItem,
  fetchAllOrders,
  fetchOrderDetail,
  proceedCheckout,
  cancelOrderedItems,
} from "../service/order.service";

const getOrders = async (req: Request, res: Response) => {
  const { id } = (req as CustomRequest).user;

  const result = await fetchAllOrders(id);

  res.status(result.code).send(result);
};

const getOrderDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await fetchOrderDetail(id);

  res.status(result.code).send(result);
};

const checkout = async (req: Request, res: Response) => {
  const { id } = (req as CustomRequest).user;
  const books: BookItem[] = req.body;

  const result = await proceedCheckout(Number(id), books);

  res.status(result.code).send(result);
};

const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = (req as CustomRequest).user;

  const result = await cancelOrderedItems(userId, Number(id));

  res.status(result.code).send(result);
};

export { getOrders, getOrderDetail, checkout, cancelOrder };
