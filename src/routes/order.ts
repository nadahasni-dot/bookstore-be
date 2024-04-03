import { Router } from "express";
import {
  getOrderDetail,
  getOrders,
  checkout,
} from "../controller/order.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.get("/", isAuthenticated, getOrders);
router.get("/:id", isAuthenticated, getOrderDetail);
router.post("/checkout", isAuthenticated, checkout);

export default router;
