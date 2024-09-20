import { Router } from 'express';
import * as appointmentController from '../controller/appointmentController/appointmentController';
import { createAppointmentSchema } from '../controller/appointmentController/schema/createAppointmentSchema';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/checkRoleMiddleware';
import validate from '../../middlewares/validation';

const router = Router();

router.post('/register', authMiddleware, checkRole(["patient"]), validate(createAppointmentSchema), appointmentController.createAppointment);
router.get('/', authMiddleware, checkRole(["patient"]), appointmentController.getAppointments);

export default router;