const Appointment = require("../models/appointment");

const getAllAppointments = async ({ id }) => {
  const appointments = await Appointment.find({ userId: id });

  return appointments;
};

module.exports = {
  getAllAppointments,
};
