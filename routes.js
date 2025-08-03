// server/routes.js
const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { name, number, email, location, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already registered' });

    const newUser = new User({ name, number, email, location, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
