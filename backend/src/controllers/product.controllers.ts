import { Request, Response, NextFunction } from "express";
import {
  newProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
} from "../services/product.services";

//Controller for get all products
export const getAllProductsController = async (req: Request, res: Response) => {
  const result = await getProductsService();

  //Failure return
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }

  //Success return
  return res.status(200).json({
    products: result.products,
  });
};

//Controller for add new product
export const newProductController = async (req: Request, res: Response) => {
  const { name, price, description, category, imageUrl } = req.body;
  const result = await newProductService({
    name,
    price,
    description,
    category,
    imageUrl,
  });

  //Failure return
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }

  //Success return
  return res.status(201).json({
    message: "New product added",
  });
};

//Controller for update existed product
export const updateProductController = async (req: Request, res: Response) => {
  const { id, name, category, description, price, imageUrl } = req.body;
  const result = await updateProductService({
    id,
    name,
    description,
    price,
    imageUrl,
    category,
  });

  //Failure return
  if (!result?.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }
  //Success return
  return res.status(200).json({
    message: "Updated successfully",
  });
};

//Controller for delete product
export const deleteProductController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await deleteProductService({ id });

  //Failure return
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }

  //Success return
  return res.status(200).json({
    message: "Inactivated product",
  });
};
