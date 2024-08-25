const express = require("express");

const postController = require("../controller/postController");
const authController = require("../controller/authController");
const commentRouter = require("./commentRoutes");

const router = express.Router();

router.use("/:id/comments", commentRouter);

router
  .route("/")
  .post(authController.protect, postController.createBlog)
  .get(authController.protect, postController.getAllPosts);

router
  .route("/:id")
  .get(authController.protect, postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

module.exports = router;
