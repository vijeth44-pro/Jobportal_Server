import Application from "../models/applicationSchema.js";

/* ================= USER → APPLY JOB ================= */

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const alreadyApplied = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already applied",
      });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted",
      data: application,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= USER → GET MY APPLICATIONS ================= */

export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id })
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: apps,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= ADMIN → GET ALL APPLICATIONS ================= */

export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: apps,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};