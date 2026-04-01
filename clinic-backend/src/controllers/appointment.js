const appointmentService = require("../services/appointment");

const createAppointment = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const { patientName, doctor, date, complaint } = req.body;

    const reception = await appointmentService.createAppointment({
      patientName,
      doctor,
      date,
      complaint,
      userId,
    });

    return res.status(201).json(reception);
  } catch (error) {
    next(error);
  }
};

const getAllAppointments = async (req, res, next) => {
  try {
    const { id } = req.user;

    const appointments = await appointmentService.getAllAppointments({ id });

    return res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async ({
  appointmentId,
  patientName,
  doctor,
  date,
  complaint,
}) => {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { patientName, doctor, date, complaint },
    { new: true },
  );

  return appointment;
};

const deleteAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;

    const deletedAppointment = await appointmentService.deleteAppointment({
      appointmentId,
    });

    return res.status(200).json({ deletedAppointment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
};
