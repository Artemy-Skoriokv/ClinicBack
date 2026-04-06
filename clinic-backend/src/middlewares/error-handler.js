const errorHandler = (err, req, res, next) => {
  if (err.status && err.errors !== undefined) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandler;