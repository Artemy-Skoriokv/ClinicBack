const { body } = require("express-validator");
const { validatorResult } = require("./validation-result");

const validateRegistration = [
  body("login")
    .isString()
    .trim()
    .matches(/^[a-zA-Z0-9]{6,}$/)
    .withMessage(
      "The login can contain only Latin letters and numbers, minimum 6 characters",
    ),
  body("password")
    .isString()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage(
      "The password must contain at least 6 characters, including letters and numbers",
    ),
  validatorResult,
];

module.exports = { validateRegistration };