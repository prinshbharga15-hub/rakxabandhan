const Message = require('../models/Message');
const { getDBStatus } = require('../config/db');

let inMemoryMessages = [];

// @desc    Create a contact/greeting message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (getDBStatus()) {
      const savedMessage = await Message.create({
        name,
        email,
        subject: subject || 'Raksha Bandhan Celebration Greeting',
        message
      });

      return res.status(201).json({
        success: true,
        message: 'Your message has been received! Wishing you a joyous Raksha Bandhan!',
        data: savedMessage
      });
    } else {
      const newMessage = {
        _id: 'msg-' + Date.now(),
        name,
        email,
        subject: subject || 'Raksha Bandhan Celebration Greeting',
        message,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      inMemoryMessages.unshift(newMessage);

      return res.status(201).json({
        success: true,
        message: 'Your message has been received! Wishing you a joyous Raksha Bandhan!',
        data: newMessage
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public (Demo / Admin preview)
const getMessages = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryMessages.length,
        data: inMemoryMessages
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages
};
