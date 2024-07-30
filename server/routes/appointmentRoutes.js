import express from 'express';
import { bookAppointment, getTeacherAppointments } from '../controller/appointmentContoller.js';
import { authMiddleware, teacherMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/appointments', bookAppointment);
router.get('/appointments/:teacherId', authMiddleware, teacherMiddleware, getTeacherAppointments);

export default router;
