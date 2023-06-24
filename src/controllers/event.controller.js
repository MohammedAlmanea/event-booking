// Import the necessary dependencies
import Event from '../models/Event.model.js';

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const event = await Event.create({
      title,
      description,
      location,
      date,
      tickets: [], // Initialize with an empty array of tickets
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Get a single event by Title
const getEventByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const lowerCaseTitle = title.toLowerCase();
    const regex = new RegExp(lowerCaseTitle, 'i');

    const event = await Event.find({ title: { $regex: regex } });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error: error });
  }
};

// Update an event by ID
const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

export {
  createEvent,
  deleteEventById,
  updateEventById,
  getEventById,
  getEventByTitle,
  getAllEvents,
};
