import db from '../config/db.js';

export const createAppointment = async (appointment) => {
  const { studentId, teacherId, date, time, status } = appointment;
  const [result] = await db.execute(
    'INSERT INTO appointments (student_id, teacher_id, date, time, status) VALUES (?, ?, ?, ?, ?)',
    [studentId, teacherId, date, time, status]
  );
  return result.insertId;
};

export const getAppointmentsByTeacher = async (teacherId) => {
  const [rows] = await db.execute('SELECT * FROM appointments WHERE teacher_id = ?', [teacherId]);
  return rows;
};

