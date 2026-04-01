const appointmentService = require("../services/appointment");

const getAllAppointments = async (req, res, next) => {
  try {
    const { id } = req.user;

    const appointments = await appointmentService.getAllAppointments({ id });

    return res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAppointments,
};
