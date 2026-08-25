const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['siblings', 'sweets', 'family', 'rakhis', 'rituals', 'decorations'],
      default: 'siblings'
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    aspectRatio: {
      type: String,
      default: 'aspect-square'
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
