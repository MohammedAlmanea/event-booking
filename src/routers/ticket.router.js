// Import necessary dependencies
import express from 'express';
import {
  createTicket,
  deleteTicketById,
  getAllTickets,
  getTicketById,
  getTicketsByUser,
  getTicketsByUserAndEvent,
  updateTicketById,
} from '../controllers/ticket.controller.js';

// Create a new router instance
const router = express.Router();

// Define routes for ticket-related operations
router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicketById);
router.delete('/:id', deleteTicketById);
router.get('/user/:userId', getTicketsByUser);
router.get('/user/:userId/event/:eventId', getTicketsByUserAndEvent);

// Export the router
export default router;
