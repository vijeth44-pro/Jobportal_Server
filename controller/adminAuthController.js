import Admin from "../models/adminUserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// It's best practice to store secret keys in environment variables
const SECRETKEY = "job_portal_secret_key";

export const registerUser = async (req, res) => {
  try {
    const { username, useremail, userphone, userpassword } = req.body;

    if (!username || !useremail || !userpassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (username, useremail, userpassword)."
      });
    }

    // Check if user already exists
    const existingUser = await Admin.findOne({ email: useremail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    // Create new user
    const newUser = await Admin.create({
      name: username,
      email: useremail,
      phone: userphone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    if (!useremail || !userpassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password."
      });
    }

    // Check if user exists
    const user = await Admin.findOne({ email: useremail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(userpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Create and assign token
    const payload = {
      id: user._id,
      name: user.name,
      role: 'admin' // Add role for differentiation
    };
    const token = jwt.sign(payload, SECRETKEY);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in logging in",
      error: error.message,
    });
  }
};