import express from "express";

const app = express();
const port = 8000;

// JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
