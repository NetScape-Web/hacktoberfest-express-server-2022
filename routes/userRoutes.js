import express from "express";
import {
  changeUserPassword,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";
import isValidUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "User route is working...",
  });
});

//public routes

router.post("/register", userRegistration);
router.post("/login", userLogin);

// Protected Routes
router.post("/changepassword", isValidUser, changeUserPassword);

export default router;
