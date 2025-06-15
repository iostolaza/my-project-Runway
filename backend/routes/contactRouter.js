//contactRouter.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
const { body, validationResult } = require('express-validator');

router.post(
  '/',
  [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().notEmpty().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const { name, email, message } = req.body;
      const contact = new Contact({ name, email, message });
      await contact.save();
      res.status(201).json({ success: true, message: 'Message received!' });
    } catch (err) {
      res.status(400).json({ success: false, message: 'Failed to save', error: err.message });
    }
  }
);

module.exports = router;
