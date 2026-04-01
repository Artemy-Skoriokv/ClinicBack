const { body } = require("express-validator");
const { validatorResult } = require("./validation-result");

const validateAppointment = [
  body("patientName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Patient name is required"),

  body("doctor")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Doctor name is required"),

  body("date")
    .isISO8601()
    .withMessage("Valid date is required")
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      if (appointmentDate < now) {
        throw new Error("Appointment date cannot be in the past");
      }
      return true;
    }),

  body("complaint")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Complaint is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Complaint must be between 10 and 500 characters"),

  validatorResult,
];

module.exports = { validateAppointment };
