const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, postController.createBlog)
  .get(authController.protect, postController.getAllPosts);

router.route("/:id").get(authController.protect, postController.getPost);

module.exports = router;
