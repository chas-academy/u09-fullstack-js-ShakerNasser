const User = require('../models/User');
const mongoose = require('mongoose');

// Hämta alla användare (för admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Hämta användare efter ID
const getUserByID = async (req, res) => {
  const { id } = req.params; // Hämta ID från URL-parametrarna
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Returnera användaren
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Skapa användare
const createUser = async (req, res) => {
  const { name, email, password } = req.body; // Lägg till password här
  
  try {
    // Kontrollera om användaren redan finns
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ name, email, password }); // Lägg till password här
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};



// Uppdatera användare
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};


// Ta bort användare
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Kontrollera om id är ett giltigt MongoDB-ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findByIdAndDelete(id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Användare raderad' }); // Returnera meddelande om att användaren har raderats
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUserByID };
