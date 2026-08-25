const GalleryItem = require('../models/GalleryItem');
const { getDBStatus } = require('../config/db');
const { defaultGallery } = require('../seeds/seedData');

let inMemoryGallery = [...defaultGallery];

// @desc    Get gallery items
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      const items = await GalleryItem.find(query);
      if (items.length > 0) {
        return res.status(200).json({
          success: true,
          count: items.length,
          data: items
        });
      }
    }

    // In-memory fallback
    let results = [...inMemoryGallery];
    if (category && category !== 'all') {
      results = results.filter((item) => item.category === category);
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like a gallery item
// @route   POST /api/gallery/:id/like
// @access  Public
const likeGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const item = await GalleryItem.findById(id);
      if (item) {
        item.likes = (item.likes || 0) + 1;
        await item.save();
        return res.status(200).json({ success: true, likes: item.likes });
      }
    }

    const itemIndex = inMemoryGallery.findIndex((i) => i._id === id);
    if (itemIndex !== -1) {
      inMemoryGallery[itemIndex].likes = (inMemoryGallery[itemIndex].likes || 0) + 1;
      return res.status(200).json({ success: true, likes: inMemoryGallery[itemIndex].likes });
    }

    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGallery,
  likeGalleryItem
};
