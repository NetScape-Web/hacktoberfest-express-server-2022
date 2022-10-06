import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "doju",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
