import * as authController from '../../src/controller/authController/authController';

import { loginSchema, registerDoctorSchema, registerPatientSchema } from '../controller/authController/schema/authSchema';

import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/checkRoleMiddleware';
import validate from '../../middlewares/validation';

const router = Router();

router.post('/register', validate(registerPatientSchema), authController.register);
router.post('/doctor/register', authMiddleware, checkRole(["admin"]), validate(registerDoctorSchema), authController.registerDoctor);
router.post('/login', validate(loginSchema), authController.login);

export default router;
