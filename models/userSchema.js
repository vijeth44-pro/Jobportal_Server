import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  type: String,
  data: String
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  experience: String,
  skills: String,
  gender: String,
  education: String,
  category: String,
  resume: resumeSchema
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
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
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "user"
    },

    blocked: {
      type: Boolean,
      default: false
    },

    profile: profileSchema
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;