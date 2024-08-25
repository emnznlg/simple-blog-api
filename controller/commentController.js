const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

exports.createComment = async (req, res, next) => {
  try {
    const { content, ...extraFields } = req.body;

    if (!content) {
      return next(new AppError("content must be provided!", 400));
    }

    if (Object.keys(extraFields).length > 0) {
      return next(
        new AppError("Only these properties are allowed: content", 400),
      );
    }

    const userId = req.user.id;
    const blogId = req.params.id;

    let comment = await Comment.create(
      { ...req.body, userId, blogId },
      {
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          },
          {
            model: Blog,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
    );

    //Convert created comment to plain object and remove createdAt and updatedAt from the created comment
    comment = comment.get({ plain: true });
    delete comment.createdAt;
    delete comment.updatedAt;

    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const post = await Blog.findByPk(req.params.id);

    if (!post) {
      return next(new AppError("No blog post found with that ID", 404));
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    let comments = await Comment.findAll({
      where: { blogId: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      offset: skip,
      limit: limit,
    });

    res.status(200).json({
      status: "success",
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};
