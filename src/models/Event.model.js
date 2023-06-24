import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  ],
});

eventSchema.virtual('soldTickets').get(function () {
  const soldTickets = this.tickets.reduce((acc, ticket) => {
    return acc + ticket.quantity;
  }, 0);
  return soldTickets;
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
