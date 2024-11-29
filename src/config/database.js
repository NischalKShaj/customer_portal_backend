// file to establish the connection between in the database

// importing the required modules
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// establishing the connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("database connected successfully..");
  } catch (error) {
    console.error("connection error", error);
  }
};

export default connection;
