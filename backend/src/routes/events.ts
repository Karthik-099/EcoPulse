import { Router } from 'express';
import { createEvent, getEvents, getEventById, joinEvent, updateEvent } from '../controllers/eventController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', authenticate, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/join', authenticate, joinEvent);
router.patch('/:id', authenticate, updateEvent);

export default router;
