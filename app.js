import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import connectDB from "./config/connectDB.js";
const app = express();
const PORT = process.env.PORT || 8000;
const host = "192.168.1.3";
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

app.listen(PORT, host, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
