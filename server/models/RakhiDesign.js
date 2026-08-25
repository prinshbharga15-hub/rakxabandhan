const mongoose = require('mongoose');

const rakhiDesignSchema = new mongoose.Schema(
  {
    creatorName: {
      type: String,
      required: [true, 'Creator name is required'],
      trim: true,
      maxLength: [60, 'Creator name cannot exceed 60 characters']
    },
    recipientName: {
      type: String,
      required: [true, 'Recipient name is required'],
      trim: true,
      maxLength: [60, 'Recipient name cannot exceed 60 characters']
    },
    threadColor: {
      type: String,
      default: '#DC2626'
    },
    secondaryThreadColor: {
      type: String,
      default: '#F59E0B'
    },
    threadStyle: {
      type: String,
      enum: ['mauli', 'royal_velvet', 'emerald_silk', 'kesari_gold', 'silver_sparkle'],
      default: 'mauli'
    },
    centerMotif: {
      type: String,
      enum: ['om', 'ganesha', 'lotus', 'peacock', 'kundan_diamond', 'swastika', 'floral_mandala'],
      default: 'floral_mandala'
    },
    dialColor: {
      type: String,
      default: '#D97706'
    },
    gemstone: {
      type: String,
      enum: ['ruby', 'emerald', 'sapphire', 'topaz', 'diamond_pearl'],
      default: 'ruby'
    },
    beadType: {
      type: String,
      enum: ['gold_pearl', 'rudraksha', 'crystal_cut', 'sandalwood', 'royal_beads'],
      default: 'gold_pearl'
    },
    customText: {
      type: String,
      trim: true,
      maxLength: [20, 'Custom text cannot exceed 20 characters'],
      default: 'BHAI'
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

rakhiDesignSchema.index({ createdAt: -1 });

module.exports = mongoose.model('RakhiDesign', rakhiDesignSchema);
