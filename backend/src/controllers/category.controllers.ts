import { Request, Response } from "express";
import { getCategoryService } from "../services/category.services";

export const getAllCategories = async (req: Request, res: Response) => {
  const result = await getCategoryService();

  //Failure return
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }

  //Success return
  return res.status(200).json({
    categories: result.categories,
  });
};
