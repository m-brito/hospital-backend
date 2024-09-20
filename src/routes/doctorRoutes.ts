import { Router } from 'express';
import * as doctorController from '../controller/doctorController/doctorController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, doctorController.getDoctors);

export default router;
