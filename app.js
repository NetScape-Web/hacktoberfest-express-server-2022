import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import connectDB from "./config/connectDB.js";
import Problem from "./middlewares/problem.js";
import { errorHandler } from "./controllers/errorController.js";
const app = express();
const PORT = process.env.PORT || 8000;
//const host = "192.168.1.3";

/* catching errors made in the code
like trying to read contents of a variable that has not been declared
start listenign for uncaughtExceptions at the very top to be able to 
catch all instances of uncaughtExceptions */
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// user route
app.use("/api/user", userRoutes);
app.use("/api/record", recordRoutes);

//handling request to wrong urls
app.get("*", (req, res, next) => {
  next(new Problem(`Can't find ${req.originalUrl} on this server!`, 400));
});

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});

// handlling promise rejections that were not caught
// catching errors that happen outside express, eg mongodb connection failed error
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
