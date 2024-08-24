const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.signIn = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, ...extraFields } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return next(
        new AppError(
          "name, email, password, and confirmPassword properties must be provided!",
          400,
        ),
      );
    }

    // Check for extra fields
    if (Object.keys(extraFields).length > 0) {
      return next(
        new AppError(
          "Only these properties are allowed: name, email, password, and confirmPassword",
          400,
        ),
      );
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return next(new AppError("Passwords must match!", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    // Send the response
    res.status(201).json({
      status: "success",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
      return next(new AppError("Email and password must be provided!", 400));
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      //cookieOptions.secure = true => For prod
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401,
        ),
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
