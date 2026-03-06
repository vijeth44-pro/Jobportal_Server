import Admin from "../models/adminUserSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRETKEY = "job_portal_secret_key";

/* ================= CREATE ADMIN ================= */
export const createUser = async (req, res) => {
  try {
    const { username, useremail, userphone, userpassword } = req.body;

    if (!username || !useremail || !userpassword) {
      return res.status(400).json({
        success: false,
        message: "Username, Email and Password are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email: useremail });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    const newAdmin = await Admin.create({
      name: username,
      email: useremail,
      phone: userphone,
      password: hashedPassword,
      role: "admin",
      blocked: false,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin,
    });

  } catch (error) {
    console.error("Create Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message,
    });
  }
};


export const getUserCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: totalUsers
    });

  } catch (error) {
    console.error("User Count Error:", error);
    res.status(500).json({
      success: false,
      message: "Error getting user count",
      error: error.message
    });
  }
};


/* ================= ADMIN LOGIN ================= */
export const loginAdmin = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    if (!useremail || !userpassword) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const admin = await Admin.findOne({ email: useremail });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.blocked) {
      return res.status(403).json({
        success: false,
        message: "Admin account is blocked",
      });
    }

    const isMatch = await bcrypt.compare(userpassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: admin._id,
      name: admin.name,
      role: "admin",      // ✅ VERY IMPORTANT
    };

    const token = jwt.sign(payload, SECRETKEY, { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
    });

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in admin login",
      error: error.message,
    });
  }
};


/* ================= GET ALL ADMINS ================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};


/* ================= SINGLE ADMIN VIEW ================= */
export const singleView = async (req, res) => {
  try {
    const id = req.params.id;

    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {
    console.error("Single Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching admin",
      error: error.message,
    });
  }
};


/* ================= DELETE ADMIN ================= */
export const deleteUser = async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });

  } catch (error) {
    console.error("Delete Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting admin",
      error: error.message,
    });
  }
};


/* ================= UPDATE ADMIN ================= */
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatePayload = req.body;

    if (updatePayload.password) {
      updatePayload.password = await bcrypt.hash(updatePayload.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAdmin,
    });

  } catch (error) {
    console.error("Update Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating admin",
      error: error.message,
    });
  }
};


/* ================= BLOCK / UNBLOCK ADMIN ================= */
export const blockUser = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.blocked = !admin.blocked;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin block status updated",
    });

  } catch (error) {
    console.error("Block Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating block status",
      error: error.message,
    });
  }
};