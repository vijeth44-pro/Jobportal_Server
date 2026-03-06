import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} from "../controller/authController.js";

import authUser from "../middleware/authUser.js";

const router = express.Router();

/* ================= AUTH ================= */

router.post("/register", registerUser);
router.post("/login", loginUser);

/* ================= PROFILE ================= */

// Get logged in user profile
router.get("/profile", authUser, getProfile);

// Update profile
router.put("/profile/update", authUser, updateProfile);

export default router;