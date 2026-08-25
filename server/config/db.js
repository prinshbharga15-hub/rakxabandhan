const mongoose = require('mongoose');
const dns = require('dns');

// Configure robust public DNS resolvers so SRV records (mongodb+srv://) resolve seamlessly across all Windows networks & ISPs
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/raksha_bandhan_db';

    console.log('📡 Connecting to MongoDB database...');

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 12000,
      connectTimeoutMS: 12000,
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
  getDBStatus,
};
