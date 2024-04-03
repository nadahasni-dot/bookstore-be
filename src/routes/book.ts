import { Router } from "express";
import { getBookDetail, getBooks } from "../controller/book.controller";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookDetail);

export default router;
