const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const {
  getAllAppointments,
} = require("../controllers/appointment");

router.get("/", authMiddleware, getAllAppointments);

module.exports = router;
