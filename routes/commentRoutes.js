const express = require("express");

const authController = require("../controller/authController");
const commentController = require("../controller/commentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authController.protect, commentController.createComment)
  .get(authController.protect, commentController.getAllComments);

module.exports = router;
