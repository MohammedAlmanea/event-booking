// Import the necessary dependencies
import  Ticket  from '../models/Ticket.model.js';

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    // TODO :
    // UPDATE THE EVENT'S TICKET ARRAY
    const { event, user, quantity } = req.body;
    const ticket = await Ticket.create({
      event,
      user,
      quantity,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// Update a ticket by ID
const updateTicketById = async (req, res) => {
  try {
    // TODO :
    // UPDATE THE EVENT'S TICKET ARRAY
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};

// Get tickets by user
const getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ user: userId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets by user' });
  }
};

// Get tickets by user and event
const getTicketsByUserAndEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.params;
    const tickets = await Ticket.find({ user: userId, event: eventId });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch tickets by user and event' });
  }
};

export {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  getTicketsByUser,
  getTicketsByUserAndEvent,
};