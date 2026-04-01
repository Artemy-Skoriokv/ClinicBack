const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth");
const {
  validateRegistration,
} = require("../middlewares/validate-registration");

router.post("/register", validateRegistration, register);

module.exports = router;