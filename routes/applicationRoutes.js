import express from "express";
import {
  applyJob,
  getMyApplications,
  getAllApplications,
} from "../controller/applicationController.js";

import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/apply/:jobId", authUser, applyJob);
router.get("/my", authUser, getMyApplications);
router.get("/all", authAdmin, getAllApplications);

export default router;