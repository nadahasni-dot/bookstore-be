import { Router } from "express";
import { getBooks } from "../controller/book.controller";

const router = Router();

router.get("/", getBooks);
router.get("/:id", (req, res) => {});

export default router;
