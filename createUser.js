const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/login');

mongoose.connect('mongodb+srv://ZaeeshCorporation:zaeesh123@cluster0.i75zqcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = new User({ email: '  ', password: hashedPassword });
  await user.save();
  console.log('User created');
  mongoose.disconnect();
};

createUser();
