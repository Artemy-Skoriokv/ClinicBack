const express = require("express");
const router = express.Router();

const appointmentRoutes = require("./appointment");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;