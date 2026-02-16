import { Router } from 'express';
import { createTask, getTasks, getTaskById, verifyTask } from '../controllers/taskController';
import { authenticate, isAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', authenticate, upload.single('proof'), createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTaskById);
router.patch('/:id/verify', authenticate, isAdmin, verifyTask);

export default router;
