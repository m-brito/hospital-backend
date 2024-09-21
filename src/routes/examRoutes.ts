import { Router } from 'express';
import validate from '../../middlewares/validation';
import { createExamSchema } from '../controller/examController/schema/createExamSchema';
import * as examController from '../controller/examController/examController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/checkRoleMiddleware';
import { updateExamSchema } from '../../src/controller/examController/schema/updateExamSchema';

const router = Router();

router.post('/register', authMiddleware, checkRole(["doctor"]), validate(createExamSchema), examController.createExam);
router.patch('/:id', authMiddleware, checkRole(["doctor"]), validate(updateExamSchema), examController.updateExam);
router.get('/', authMiddleware, checkRole(["doctor", "patient", "admin"]), examController.getExams);

export default router;
