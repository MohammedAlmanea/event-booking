import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});
const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
