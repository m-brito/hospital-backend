import { Router } from 'express';
import validate from '../../middlewares/validation';
import { createExamSchema } from '../controller/examController/schema/createExamSchema';
import * as examController from '../controller/examController/examController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/checkRoleMiddleware';

const router = Router();

router.post('/register', authMiddleware, checkRole(["doctor"]), validate(createExamSchema), examController.createExam);

export default router;
