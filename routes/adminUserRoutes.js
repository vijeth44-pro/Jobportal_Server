import express from "express";
import {
  createUser,
  getAllUsers,
  singleView,
  deleteUser,
  updateUser,
  blockUser,
  getUserCount 
} from "../controller/adminUserController.js";

const router = express.Router();

router.post("/addUser", createUser);
router.get("/getUser", getAllUsers);
router.get("/singleView/:id", singleView);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.put("/block/:id", blockUser);
router.get("/count", getUserCount);

export default router;