import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRETKEY = "job_portal_secret_key";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { username, useremail, userphone, userpassword } = req.body;

    const existingUser = await User.findOne({ email: useremail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    await User.create({
      name: username,
      email: useremail,
      phone: userphone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registering user",
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    const userData = await User.findOne({ email: useremail });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      userpassword,
      userData.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      id: userData._id,
      name: userData.name,
      role: "user",
    };

    const token = jwt.sign(payload, SECRETKEY, { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
    });
  }
};

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profile: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};