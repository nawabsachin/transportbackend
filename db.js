const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');

  try {
    await mongoose.connect('mongodb+srv://ZaeeshCorporation:zaeesh123@cluster0.i75zqcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connection successful!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
