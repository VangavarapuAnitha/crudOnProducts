import Product from "../models/product.model";

interface NewProductType {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

interface UpdateProductType {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  imageUrl?: string;
}

interface DeleteType {
  id: string;
}

//Service for get all active product documnets
export const getProductsService = async () => {
  try {
    const products = await Product.find(
      { isActive: true },
      "_id name price category description imageUrl"
    );

    //No active product documents
    if (products.length === 0) {
      return {
        success: false,
        error: {
          code: 404,
          message: "No active products found",
        },
      };
    }

    //Return active products
    return {
      success: true,
      products: products,
    };
  } catch (error) {
    console.log("Error in fetching all products:", error);
    //Unexpected error
    return {
      success: false,
      error: {
        code: 500,
        message: "Server error",
      },
    };
  }
};

//Service for add new product
export const newProductService = async ({
  name,
  price,
  description,
  category,
  imageUrl,
}: NewProductType) => {
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
    });
    await newProduct.save();
    return {
      success: true,
      message: "New product added",
    };
  } catch (error: any) {
    console.log("Error in creating new product:", error);

    //Unique product name violation
    if (error.code === 11000) {
      return {
        success: false,
        error: {
          code: 409,
          message: "Duplicate product name",
        },
      };
    }

    //Unexpected error
    return {
      success: false,
      error: {
        code: 500,
        message: "Server error",
      },
    };
  }
};

//Service for update existed active product
export const updateProductService = async ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
}: UpdateProductType) => {
  try {
    const updateFields: any = {};

    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (category !== undefined) updateFields.category = category;

    await Product.findByIdAndUpdate(id, { $set: updateFields });
    return {
      success: true,
      message: "Updated successfully",
    };
  } catch (error: any) {
    console.log("Error in updating product:", error);
    //Unique name violation error
    if (error.code === 11000) {
      return {
        success: false,
        error: {
          code: 409,
          message: "Duplicate product name",
        },
      };
    }
    //Unexpected error
    return {
      success: false,
      error: {
        code: 500,
        message: "Server errror",
      },
    };
  }
};

//Service for inactivate(delete) existed active product
export const deleteProductService = async ({ id }: DeleteType) => {
  try {
    await Product.findByIdAndUpdate(id, { isActive: false });

    return {
      success: true,
      message: "Inactivated product",
    };
  } catch (error) {
    console.log("Error in deleting(inactivate) product:", error);
    //Unexpected error
    return {
      success: false,
      error: {
        code: 500,
        message: "Server error",
      },
    };
  }
};
