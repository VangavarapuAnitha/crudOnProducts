import { Request, Response } from "express";
import {
  newProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
} from "../services/product.services";

//Controller for get all products
export const getAllProductsController = async (req: Request, res: Response) => {
  const { search, minPrice, maxPrice, sortOrder } = req.query;
  // Convert minPrice and maxPrice to numbers since query params are strings
  const minPriceNum = minPrice ? Number(minPrice) : undefined;
  const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;

  const result = await getProductsService({
    search: search as string | undefined,
    minPrice: minPriceNum,
    maxPrice: maxPriceNum,
    sortOrder: sortOrder as "asc" | "desc" | null | undefined,
  });

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
  const { name, price, description, category, imageUrl, productUrl } = req.body;
  const result = await newProductService({
    name,
    price,
    description,
    category,
    imageUrl,
    productUrl,
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
  const { id, name, category, description, price, imageUrl, productUrl } =
    req.body;
  const result = await updateProductService({
    id,
    name,
    description,
    price,
    imageUrl,
    category,
    productUrl,
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
