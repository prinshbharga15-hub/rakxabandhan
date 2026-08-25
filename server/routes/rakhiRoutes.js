const express = require('express');
const router = express.Router();
const { saveRakhiDesign, getRakhiDesigns } = require('../controllers/rakhiController');
const { validateRakhiDesign } = require('../middleware/validation');

router.route('/')
  .get(getRakhiDesigns)
  .post(validateRakhiDesign, saveRakhiDesign);

module.exports = router;
