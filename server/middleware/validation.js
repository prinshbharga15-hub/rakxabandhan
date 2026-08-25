const { body, validationResult } = require('express-validator');

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};

// Wish validation rules
const validateWish = [
  body('senderName').trim().notEmpty().withMessage('Sender name is required').isLength({ max: 60 }),
  body('recipientName').trim().notEmpty().withMessage('Recipient name is required').isLength({ max: 60 }),
  body('message').trim().notEmpty().withMessage('Message cannot be empty').isLength({ min: 5, max: 600 }),
  validate
];

// Message / Contact form validation rules
const validateMessage = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 5, max: 1000 }),
  validate
];

// Rakhi design validation rules
const validateRakhiDesign = [
  body('creatorName').trim().notEmpty().withMessage('Creator name is required').isLength({ max: 60 }),
  body('recipientName').trim().notEmpty().withMessage('Recipient name is required').isLength({ max: 60 }),
  validate
];

module.exports = {
  validateWish,
  validateMessage,
  validateRakhiDesign
};
