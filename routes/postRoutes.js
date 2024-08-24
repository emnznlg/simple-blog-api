const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/").post(authController.protect, postController.createBlog);

module.exports = router;
