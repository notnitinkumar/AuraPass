import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isOrganizerOrAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, isOrganizerOrAdmin, createEvent);
router.put('/:id', verifyToken, isOrganizerOrAdmin, updateEvent);
router.delete('/:id', verifyToken, isOrganizerOrAdmin, deleteEvent);

export default router;
