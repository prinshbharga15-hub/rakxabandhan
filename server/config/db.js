const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/raksha_bandhan_db';
    
    // Set a short timeout for connection attempt so app starts quickly even if MongoDB is not running locally
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });

    isConnected = true;
    console.log(`✨ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.info('💡 Running with In-Memory Persistent Store fallback for instant demo readiness.');
    isConnected = false;
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = {
  connectDB,
  getDBStatus
};
