import { Router } from 'express';
import { getTransactions, createTransaction, getBalance } from '../controllers/transactionController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getTransactions);
router.post('/', authenticate, createTransaction);
router.get('/balance', authenticate, getBalance);

export default router;
