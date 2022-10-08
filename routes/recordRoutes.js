import express from "express";
import { createRecord, getAllRecord } from "../controllers/recordController.js";
import isValidUser from "../middlewares/authMiddleware.js";

const router = express.Router();
console.log("hitting api/record");
router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "record route is working...",
  });
});

//public routes

router.post("/create", createRecord);
router.get("/getAllRecord", getAllRecord);

// Protected Routes

export default router;
