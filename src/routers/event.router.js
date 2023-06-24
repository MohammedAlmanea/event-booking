import express from 'express';
import {
  createEvent,
  deleteEventById,
  updateEventById,
  getEventById,
  getAllEvents,
  getEventByTitle,
} from '../controllers/event.controller.js';

// Create a new router instance
const router = express.Router();

router.post('/', createEvent);
router.put('/:id', updateEventById);
router.get('/:id', getEventById);
router.get('/', getAllEvents);
router.get('/search/title', getEventByTitle);
router.delete('/:id', deleteEventById);

// Export the router
export default router;
