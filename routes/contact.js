const express = require('express');
const Contact = require('../models/Contact'); // Assuming you have a Contact model
const router = express.Router();

// POST route to save contact messages
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create new contact message entry
  const contactEntry = new Contact({
    name,
    email,
    phone,
    message,
  });

  try {
    // Save the message to the database
    await contactEntry.save();
    res.status(201).json({ message: 'Message received successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving the message' });
  }
});

// GET route to fetch all contact messages
router.get('/messages', async (req, res) => {
  try {
    // Fetch all messages from the Contact model
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
