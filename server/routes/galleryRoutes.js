const express = require('express');
const router = express.Router();
const { getGallery, likeGalleryItem } = require('../controllers/galleryController');

router.route('/')
  .get(getGallery);

router.route('/:id/like')
  .post(likeGalleryItem);

module.exports = router;
