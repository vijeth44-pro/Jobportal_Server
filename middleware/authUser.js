import jwt from "jsonwebtoken";

const SECRETKEY = "job_portal_secret_key";

const authUser = async (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token required",
      });
    }

    const decoded = jwt.verify(token, SECRETKEY);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = decoded; // contains id, role, etc.
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;