const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: { type: String, required: true, unique: true },
  location: String,
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
