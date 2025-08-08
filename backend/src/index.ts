import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import products from "./routes/product.routes";
import categories from "./routes/category.routes";
//Load all .env variables into process.env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

//Routes
app.use("/api/products", products);
app.use("/api/categories", categories);

//Connect to db then start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("Error in db connection:", error);
  }
};

startServer();
