const Appointment = require("../models/appointment");

const createAppointment = async (appointmentData) => {
  const appointment = new Appointment({
    patientName: appointmentData.patientName,
    doctor: appointmentData.doctor,
    date: appointmentData.date,
    complaint: appointmentData.complaint,
    userId: appointmentData.userId,
  });

  await appointment.save();
  return appointment;
};

const getAllAppointments = async ({ id }) => {
  const appointments = await Appointment.find({ userId: id });

  return appointments;
};

module.exports = {
  createAppointment,
  getAllAppointments,
};
