const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, ...extraFields } = req.body;

    if (!title || !content) {
      return next(
        new AppError("title and content properties must be provided!", 400),
      );
    }

    if (Object.keys(extraFields).length > 0) {
      return next(
        new AppError(
          "Only these properties are allowed: title and content",
          400,
        ),
      );
    }

    const userId = req.user.id;
    const blog = await Blog.create({ ...req.body, userId });

    res.status(201).json({
      status: "success",
      data: {
        blog: {
          id: blog.id,
          title: blog.title,
          content: blog.content,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
