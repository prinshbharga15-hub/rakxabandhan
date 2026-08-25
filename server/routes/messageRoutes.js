const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/messageController');
const { validateMessage } = require('../middleware/validation');

router.route('/')
  .get(getMessages)
  .post(validateMessage, createMessage);

module.exports = router;
