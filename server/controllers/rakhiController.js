const RakhiDesign = require('../models/RakhiDesign');
const { getDBStatus } = require('../config/db');
const { defaultRakhis } = require('../seeds/seedData');

let inMemoryRakhis = [...defaultRakhis];

// @desc    Save custom 3D Rakhi design
// @route   POST /api/rakhis
// @access  Public
const saveRakhiDesign = async (req, res, next) => {
  try {
    const {
      creatorName,
      recipientName,
      threadColor,
      secondaryThreadColor,
      threadStyle,
      centerMotif,
      dialColor,
      gemstone,
      beadType,
      customText
    } = req.body;

    if (getDBStatus()) {
      const design = await RakhiDesign.create({
        creatorName,
        recipientName,
        threadColor: threadColor || '#DC2626',
        secondaryThreadColor: secondaryThreadColor || '#F59E0B',
        threadStyle: threadStyle || 'mauli',
        centerMotif: centerMotif || 'floral_mandala',
        dialColor: dialColor || '#D97706',
        gemstone: gemstone || 'ruby',
        beadType: beadType || 'gold_pearl',
        customText: customText || 'BHAI',
        likes: 0
      });

      return res.status(201).json({
        success: true,
        message: 'Your custom Rakhi has been crafted & saved!',
        data: design
      });
    } else {
      const newDesign = {
        _id: 'rakhi-' + Date.now(),
        creatorName,
        recipientName,
        threadColor: threadColor || '#DC2626',
        secondaryThreadColor: secondaryThreadColor || '#F59E0B',
        threadStyle: threadStyle || 'mauli',
        centerMotif: centerMotif || 'floral_mandala',
        dialColor: dialColor || '#D97706',
        gemstone: gemstone || 'ruby',
        beadType: beadType || 'gold_pearl',
        customText: customText || 'BHAI',
        likes: 0,
        createdAt: new Date().toISOString()
      };

      inMemoryRakhis.unshift(newDesign);

      return res.status(201).json({
        success: true,
        message: 'Your custom Rakhi has been crafted & saved!',
        data: newDesign
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all crafted Rakhis
// @route   GET /api/rakhis
// @access  Public
const getRakhiDesigns = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const designs = await RakhiDesign.find().sort({ createdAt: -1 }).limit(20);
      return res.status(200).json({
        success: true,
        count: designs.length,
        data: designs
      });
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryRakhis.length,
        data: inMemoryRakhis
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveRakhiDesign,
  getRakhiDesigns
};
