const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");
const { validateAppointment } = require("../middlewares/validate-appointment");

router.post("/", authMiddleware, validateAppointment, createAppointment);
router.get("/", authMiddleware, getAllAppointments);
router.patch("/:id", authMiddleware, validateAppointment, updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;
