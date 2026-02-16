import { Router } from 'express';
import { getUser, updateUser, getLeaderboard } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.get('/:id', getUser);
router.patch('/:id', authenticate, updateUser);

export default router;
