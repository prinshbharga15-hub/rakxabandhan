require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Route imports
const wishRoutes = require('./routes/wishRoutes');
const messageRoutes = require('./routes/messageRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const rakhiRoutes = require('./routes/rakhiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Security and utility middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: '*', // Allow all origins for dev & seamless deployment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Raksha Bandhan Festival API is live & auspicious! 🌸🪔✨',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/wishes', wishRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/rakhis', rakhiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Raksha Bandhan Festival REST API 🪔',
    endpoints: [
      '/api/wishes',
      '/api/messages',
      '/api/gallery',
      '/api/rakhis',
      '/api/health'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Raksha Bandhan Festival Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
});

module.exports = app;
