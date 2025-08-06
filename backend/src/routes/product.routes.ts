import { Router } from "express";
import { validateRequestBody } from "../middlewares/productMiddleware";
import {
  getAllProductsController,
  newProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controllers";

const router = Router();

router.get("/", getAllProductsController);
router.post("/", validateRequestBody, newProductController);
router.delete("/:id", validateRequestBody, deleteProductController);
router.put("/", validateRequestBody, updateProductController);

export default router;
