import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routers/user.router.js';
import eventRouter from './src/routers/event.router.js';
import ticketRouter from './src/routers/ticket.router.js';
import { connection } from './src/config/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;
connection()
app.use(express.json());
app.use('/user', userRouter);
app.use('/ticket', ticketRouter);
app.use('/event', eventRouter);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
