const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

const validatorResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors.array()[0].msg));
  }
  next();
};

module.exports = { validatorResult };