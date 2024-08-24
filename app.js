/* eslint-disable no-console */
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

// eslint-disable-next-line no-unused-vars
const db = require("./utils/database");

dotenv.config({ path: "./config.env" });

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against XSS
app.use(xss());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
