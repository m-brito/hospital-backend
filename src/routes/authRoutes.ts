import * as authController from '../../src/controller/authController/authController';

import { loginSchema, registerSchema } from '../controller/authController/schema/authSchema';

import { Router } from 'express';
import validate from '../../middlewares/validation';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;
