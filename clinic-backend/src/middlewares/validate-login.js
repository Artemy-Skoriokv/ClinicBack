const { body } = require("express-validator");
const { validatorResult } = require("./validation-result");

const validateLogin = [
  body("login")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Login required"),
    
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password required"),
    
  validatorResult,
];

module.exports = { validateLogin };