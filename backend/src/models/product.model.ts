import mongoose, { Schema, Document } from "mongoose";

export interface ProductType extends Document {
  name: string;
  price: number;
  category: string[];
  description: string;
  imageUrl: string;
  productUrl: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema<ProductType> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    productUrl: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductType>(
  "Product",
  ProductSchema,
  "products"
);

export default Product;
