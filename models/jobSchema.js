import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    description: {
      type: String,
    },

    salary: {
      type: String,
    },

    jobType: {
      type: String,
    },

    category: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    applyLink: {
      type: String,   
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);