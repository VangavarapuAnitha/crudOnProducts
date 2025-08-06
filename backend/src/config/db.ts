import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const db_name = process.env.DB_NAME;
  const db_host = process.env.DB_HOST;

  if (!db_name || !db_host) {
    throw new Error("DB_HOST or DB_NAME is not defined in .env");
  }

  try {
    const uri = `${db_host}/${db_name}`;
    await mongoose.connect(uri);
    console.log("DB conncted");
  } catch (error) {
    console.log("DB not connected");
    process.exit(1);
  }
};

export default connectDB;
