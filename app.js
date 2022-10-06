import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = 8000;

// JSON
app.use(express.json());

// user route
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
