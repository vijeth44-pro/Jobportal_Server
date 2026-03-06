import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "admin"
  },

  blocked: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Admin = mongoose.model("Admin", adminUserSchema);

export default Admin;