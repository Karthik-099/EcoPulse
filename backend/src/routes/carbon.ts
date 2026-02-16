import { Router } from 'express';
import { createCarbonCredit, getCarbonCredits, approveCarbonCredit } from '../controllers/carbonController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createCarbonCredit);
router.get('/', authenticate, isAdmin, getCarbonCredits);
router.patch('/:id/approve', authenticate, isAdmin, approveCarbonCredit);

export default router;
