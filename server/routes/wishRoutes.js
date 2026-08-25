const express = require('express');
const router = express.Router();
const { getWishes, createWish, likeWish } = require('../controllers/wishController');
const { validateWish } = require('../middleware/validation');

router.route('/')
  .get(getWishes)
  .post(validateWish, createWish);

router.route('/:id/like')
  .post(likeWish);

module.exports = router;
