// Server/models/login.js
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin', // or 'user', depending on your use case
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('login', loginSchema);
