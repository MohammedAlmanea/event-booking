// Import necessary dependencies
import express from 'express';
import {
  Register,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/user.controller.js';

// Create a new router instance
const router = express.Router();

// Define routes for user-related operations
router.post('/register', Register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Export the router
export default router;
