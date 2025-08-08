import { Router } from "express";
import { getAllCategories } from "../controllers/category.controllers";

const router = Router();

router.get("/", getAllCategories);

export default router;
