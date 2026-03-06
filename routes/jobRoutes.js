import express from "express";
import {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
} from "../controller/jobController.js";

import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// User side - get all jobs
router.get("/all", getAllJobs);

// Admin side - create job
router.post("/create", authAdmin, createJob);

// Admin side - delete job
router.delete("/delete/:id", authAdmin, deleteJob);

// Admin side - update job
router.put("/update/:id", authAdmin, updateJob);

export default router;