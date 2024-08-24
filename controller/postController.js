const Blog = require("../models/blogModel");
const User = require("../models/userModel");
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

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Blog.findAll({
      include: {
        model: User,
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
    });

    res.status(200).json({
      status: "success",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Blog.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
    });

    if (!post) {
      return next(new AppError("No blog post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};
