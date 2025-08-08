import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";

//Joi schema for post request body
export const newProductRequest = Joi.object()
  .keys({
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    category: Joi.array()
      .items(Joi.string().trim().required())
      .min(1)
      .required(),
    imageUrl: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
  })
  .unknown(false);

//Joi schema for put request body
export const updateProductRequest = Joi.object()
  .keys({
    id: Joi.string().trim().required(),
    name: Joi.string().trim(),
    price: Joi.number(),
    category: Joi.array().items(Joi.string().trim().required()).min(1),
    imageUrl: Joi.string().trim(),
    description: Joi.string().trim(),
  })
  .or("name", "price", "category", "imageUrl", "description")
  .unknown(false);

//Joi schema for delete params
export const deleteProductRequest = Joi.object()
  .keys({
    id: Joi.string().trim().required(),
  })
  .unknown(false);

//Check product existence
const isProductExisted = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    return {
      success: false,
      error: {
        code: 404,
        message: "No documnet found",
      },
    };
  }
  return {
    success: true,
    product: product,
  };
};

//Middleware for Put,Post and Delete routes
export const validateRequestBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "POST") {
      await newProductRequest.validateAsync(req.body, { abortEarly: false });
    } else if (req.method === "PUT") {
      await updateProductRequest.validateAsync(req.body, { abortEarly: false });

      const { id } = req.body;
      //Before updation make sure that product documnet is existed
      const result = await isProductExisted(id);
      if (!result.success) {
        return res.status(result.error?.code as number).json({
          message: result.error?.message,
        });
      }

      //Before updation make sure that product documnet is in active
      if (!result.product?.isActive) {
        return res.status(403).json({
          message: "Product is inactive. Action forbidden",
        });
      }
    } else if (req.method === "DELETE") {
      await deleteProductRequest.validateAsync(req.params, {
        abortEarly: false,
      });

      const id = req.params.id;
      //Before deletion make sure product is existed
      const result = await isProductExisted(id);
      if (!result.success) {
        return res.status(result.error?.code as number).json({
          message: result.error?.message,
        });
      }

      //Before deletion make sure that product is active
      if (!result.product?.isActive) {
        return res.status(403).json({
          message: "Product is inactive. Action forbidden",
        });
      }
    }
    next(); //Proceed with controllers
  } catch (error) {
    //Validation errors from Joi schemas
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: "validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    //Unexpected error
    console.log("Error in middleware:", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
