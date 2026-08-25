const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
      maxLength: [60, 'Sender name cannot exceed 60 characters']
    },
    recipientName: {
      type: String,
      required: [true, 'Recipient name is required'],
      trim: true,
      maxLength: [60, 'Recipient name cannot exceed 60 characters']
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true,
      default: 'Brother'
    },
    message: {
      type: String,
      required: [true, 'Wish message cannot be empty'],
      trim: true,
      maxLength: [600, 'Wish message cannot exceed 600 characters']
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'gu', 'hinglish'],
      default: 'gu'
    },
    category: {
      type: String,
      enum: ['heartfelt', 'funny', 'poetic', 'blessing', 'custom'],
      default: 'heartfelt'
    },
    likes: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

wishSchema.index({ createdAt: -1 });
wishSchema.index({ likes: -1 });

module.exports = mongoose.model('Wish', wishSchema);
