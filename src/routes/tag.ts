import { Router } from "express";
import { getTags } from "../controller/tag.controller";

const router = Router();

router.get("/", getTags);

export default router;
