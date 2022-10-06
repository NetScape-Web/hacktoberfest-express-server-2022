import express from "express";
import { userRegistration } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "User route is working...",
  });
});

//public routes

router.post("/register", userRegistration);

export default router;
