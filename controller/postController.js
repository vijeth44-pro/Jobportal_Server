import Post from "../models/postSchema.js";

export const createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!caption && !image) {
      return res.status(400).json({
        success: false,
        message: "Caption or Image is required",
      });
    }

    const addData = await Post.create({
      caption,
      image,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: addData,
    });

  } catch (error) {
    console.error("Create Post Error:", error);

    res.status(500).json({
      success: false,
      message: "Error adding post",
      error: error.message,
    });
  }
};