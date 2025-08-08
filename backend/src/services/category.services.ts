import Category from "../models/category.model";
//Service for get all active category documnets
export const getCategoryService = async () => {
  try {
    const categories = await Category.find({}, "_id name").lean();

    //No active product documents
    if (categories.length === 0) {
      return {
        success: false,
        error: {
          code: 404,
          message: "No active categories found",
        },
      };
    }

    //Return active categories
    return {
      success: true,
      categories: categories,
    };
  } catch (error) {
    console.log("Error in fetching all categories:", error);
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
