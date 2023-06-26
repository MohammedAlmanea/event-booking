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


const Event = mongoose.model('Event', eventSchema);
export default Event;
