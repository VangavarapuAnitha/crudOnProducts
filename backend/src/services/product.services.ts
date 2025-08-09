import Product from "../models/product.model";
interface GetProductsType {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc" | null | undefined;
  categories?: string | undefined;
}

interface NewProductType {
  name: string;
  price: number;
  description: string;
  category: string[];
  imageUrl: string;
  productUrl: string;
}

interface UpdateProductType {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string[];
  imageUrl?: string;
  productUrl: string;
}

interface DeleteType {
  id: string;
}

//Service for get all active product documnets
export const getProductsService = async ({
  search,
  minPrice,
  maxPrice,
  sortOrder,
  categories,
}: GetProductsType) => {
  try {
    // Build query object
    const query: any = { isActive: true };

    // Add search filter if provided
    if (search) {
      // Case-insensitive regex search on product name
      query.name = { $regex: search, $options: "i" };
    }

    // Add price filter if both minPrice and maxPrice provided
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    const finalCategories = categories?.split(",");
    // Category filter
    if (finalCategories && finalCategories.length > 0) {
      query.category = { $in: finalCategories };
    }

    // Determine sort object
    let sort: any = {};
    if (sortOrder === "asc") sort.price = 1;
    else if (sortOrder === "desc") sort.price = -1;

    const products = await Product.find(
      query,
      "_id name price category description imageUrl productUrl"
    )
      .sort(sort)
      .lean();

    //No active product documents
    if (products.length === 0) {
      console.log("no products found");
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
  productUrl,
}: NewProductType) => {
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      productUrl,
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
  productUrl,
}: UpdateProductType) => {
  try {
    const updateFields: any = {};

    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (productUrl !== undefined) updateFields.productUrl = productUrl;
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
      message: "Deleted product",
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
