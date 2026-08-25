const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxLength: [80, 'Name cannot exceed 80 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    subject: {
      type: String,
      trim: true,
      default: 'Raksha Bandhan Celebration Greeting',
      maxLength: [120, 'Subject cannot exceed 120 characters']
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxLength: [1000, 'Message cannot exceed 1000 characters']
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema);
