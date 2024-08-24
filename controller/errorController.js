const handleDuplicateEmailError = (res) => {
  res.status(400).json({
    status: "fail",
    message: "This email is already registered.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error details for development purposes
  console.error("💥 ERROR 💥", {
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  // Handle Sequelize Unique Constraint Error specifically for email
  if (
    err.name === "SequelizeUniqueConstraintError" &&
    err.errors[0]?.path === "email"
  ) {
    return handleDuplicateEmailError(res);
  }

  // Generic error handler
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
