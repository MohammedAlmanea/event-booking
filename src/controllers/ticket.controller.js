// Import the necessary dependencies
import Ticket from '../models/Ticket.model.js';
import Event from '../models/Event.model.js';
// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { event, user, quantity } = req.body;

    // Create the ticket
    const ticket = await Ticket.create({
      event,
      user,
      quantity,
    });

    // Update the event's ticket array
    const updatedEvent = await Event.findByIdAndUpdate(
      event,
      { $push: { tickets: ticket } },
      { new: true }
    );

    console.log(updatedEvent.soldTickets);

    res.status(201).json({ ticket, updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create ticket', error });
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

    // Find the ticket to be deleted
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Find the event associated with the deleted ticket
    const event = await Event.findOne({ tickets: id });
    if (!event) {
      return res.json({ message: 'Ticket deleted successfully' });
    }

    // Remove the ticket's ID from the event's ticket array
    event.tickets.pull(id);
    await event.save();

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
