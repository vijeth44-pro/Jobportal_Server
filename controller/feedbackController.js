import Feedback from "../models/feedbackSchema.js";

/* ADD FEEDBACK */
export const addFeedback = async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: "Email and feedback required",
            });
        }

        const newFeedback = new Feedback({
            email,
            message,
        });

        await newFeedback.save();

        res.json({
            success: true,
            message: "Feedback submitted",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/* GET ALL FEEDBACK (ADMIN) */
export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: feedbacks,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};