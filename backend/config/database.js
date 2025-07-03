const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string - you can use MongoDB Atlas or local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kaishi-nihon';
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    // Don't exit the process - just log the error and continue
    console.log('⚠️  Continuing without database connection...');
  }
};

module.exports = connectDB; 