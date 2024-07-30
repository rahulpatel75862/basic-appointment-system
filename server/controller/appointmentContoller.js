import { createAppointment, getAppointmentsByTeacher } from '../models/appointmentModels.js';

export const bookAppointment = async (req, res) => {
  const { studentId, teacherId, date, time, status } = req.body;

  try {
    const appointmentId = await createAppointment({ studentId, teacherId, date, time, status });
    res.status(201).json({ appointmentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
};

export const getTeacherAppointments = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const appointments = await getAppointmentsByTeacher(teacherId);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};
