import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();

const salt = Number(process.env.SALT);
const pepper = process.env.PEPPER;

// Create a new user
const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password with the pepper before storing it in the database
    const pepperedPassword = password + pepper;
    const hashedPassword = await bcrypt.hash(pepperedPassword, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Failed to create user', error: error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a user by ID
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'Deleted User', deletedUser });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Concatenate the provided password with the pepper
    const pepperedPassword = password + pepper;

    // Compare the provided password with the hashed password with the pepper
    const isPasswordMatch = await bcrypt.compare(
      pepperedPassword,
      user.password
    );

    if (isPasswordMatch) {
      res.json({ message: 'Login successful', user: user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error });
  }
};

export { Register, login, getAllUsers, getUser, deleteUser, updateUser };
