const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/register").post(authController.signIn);
router.route("/login").post(authController.login);

module.exports = router;
