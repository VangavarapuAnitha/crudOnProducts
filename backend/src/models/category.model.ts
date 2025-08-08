import mongoose, { Schema, Document } from "mongoose";

export interface CategoryType extends Document {
  name: string;
}

const CategorySchema: Schema<CategoryType> = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Category = mongoose.model<CategoryType>(
  "Category",
  CategorySchema,
  "categories" // This specifies the collection name
);

export default Category;
