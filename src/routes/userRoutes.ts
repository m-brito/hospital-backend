import { Router } from 'express';
import { authMiddleware } from './../../middlewares/authMiddleware';
import * as authController from '../../src/controller/authController/authController';

const router = Router();

router.patch('/', authMiddleware, authController.patchUser);
router.get('/profile', authMiddleware, authController.getProfile);

export default router;

