const express = require("express");
const router = express.Router();
const { register, userLogin } = require("../controllers/auth");
const {
  validateRegistration,
} = require("../middlewares/validate-registration");
const { validateLogin } = require("../middlewares/validate-login");

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, userLogin);

module.exports = router;