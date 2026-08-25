const Wish = require('../models/Wish');
const { getDBStatus } = require('../config/db');
const { defaultWishes } = require('../seeds/seedData');

// In-Memory storage fallback initialized with seed data
let inMemoryWishes = [...defaultWishes];

// @desc    Get all wishes
// @route   GET /api/wishes
// @access  Public
const getWishes = async (req, res, next) => {
  try {
    const { category, sort = 'latest', limit = 50 } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'popular') {
        sortOption = { likes: -1, createdAt: -1 };
      }

      const wishes = await Wish.find(query).sort(sortOption).limit(Number(limit));
      return res.status(200).json({
        success: true,
        count: wishes.length,
        data: wishes
      });
    } else {
      // In-memory fallback
      let results = [...inMemoryWishes];
      if (category && category !== 'all') {
        results = results.filter((w) => w.category === category);
      }
      if (sort === 'popular') {
        results.sort((a, b) => b.likes - a.likes);
      } else {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return res.status(200).json({
        success: true,
        count: results.length,
        data: results.slice(0, Number(limit))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new wish
// @route   POST /api/wishes
// @access  Public
const createWish = async (req, res, next) => {
  try {
    const { senderName, recipientName, relationship, message, language, category } = req.body;

    if (getDBStatus()) {
      const wish = await Wish.create({
        senderName,
        recipientName,
        relationship: relationship || 'Brother',
        message,
        language: language || 'en',
        category: category || 'heartfelt',
        likes: 0
      });

      return res.status(201).json({
        success: true,
        message: 'Wish shared successfully on the Wishes Wall!',
        data: wish
      });
    } else {
      const newWish = {
        _id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        senderName,
        recipientName,
        relationship: relationship || 'Brother',
        message,
        language: language || 'en',
        category: category || 'heartfelt',
        likes: 0,
        createdAt: new Date().toISOString()
      };
      inMemoryWishes.unshift(newWish);
      return res.status(201).json({
        success: true,
        message: 'Wish shared successfully on the Wishes Wall!',
        data: newWish
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Like / Bless a wish
// @route   POST /api/wishes/:id/like
// @access  Public
const likeWish = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const wish = await Wish.findById(id);
      if (!wish) {
        return res.status(404).json({ success: false, message: 'Wish not found' });
      }
      wish.likes = (wish.likes || 0) + 1;
      await wish.save();
      return res.status(200).json({
        success: true,
        likes: wish.likes
      });
    } else {
      const wishIndex = inMemoryWishes.findIndex((w) => w._id === id);
      if (wishIndex === -1) {
        return res.status(404).json({ success: false, message: 'Wish not found' });
      }
      inMemoryWishes[wishIndex].likes = (inMemoryWishes[wishIndex].likes || 0) + 1;
      return res.status(200).json({
        success: true,
        likes: inMemoryWishes[wishIndex].likes
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishes,
  createWish,
  likeWish
};
