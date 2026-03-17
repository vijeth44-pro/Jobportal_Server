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


export const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // ✅ use "user" and "req.user.id" to match your schema & auth middleware
    if (application.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Application withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};