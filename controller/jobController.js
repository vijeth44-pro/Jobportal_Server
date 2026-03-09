import Job from "../models/jobSchema.js";

/* ================= CREATE JOB ================= */
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      jobType,
      category,
      contactEmail,
      salary,
      applyLink,
      workExperience,
    } = req.body;

    if (!title || !company) {
      return res.status(400).json({
        success: false,
        message: "Title and Company are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      jobType,
      category,
      contactEmail,
      salary,
      applyLink,
      workExperience,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

/* ================= GET ALL JOBS ================= */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Fetch Jobs Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

/* ================= DELETE JOB ================= */
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};

/* ================= UPDATE JOB ================= */
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};