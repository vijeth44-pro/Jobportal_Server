import express from "express";
import { addFeedback, getAllFeedback } from "../controller/feedbackController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

/* USER SUBMIT FEEDBACK */
router.post("/add", addFeedback);

/* ADMIN VIEW FEEDBACK */
router.get("/all", authAdmin, getAllFeedback);

export default router;