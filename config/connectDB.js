import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbname: "doju",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
