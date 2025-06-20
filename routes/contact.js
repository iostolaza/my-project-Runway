
// routes/contact.js

// const express = require('express');
// const router  = express.Router();
// const Contact = require('../models/Contact');
// const { body, validationResult } = require('express-validator');

// // POST /api/contact
// router.post(
//   '/',
//   [
//     body('name').trim().notEmpty().escape(),
//     body('email').isEmail().normalizeEmail(),
//     body('message').trim().notEmpty().escape(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     const { name, email, message } = req.body;

//     try {
//       await new Contact({ name, email, message }).save();
//       return res.status(201).json({ success: true, message: 'Message received!' });
//     } catch (err) {
//       console.error('Error in contact route:', err);
//       return res.status(500).json({
//         success: false,
//         message: 'Server error saving message',
//         error: err.message,
//       });
//     }
//   }
// );

// module.exports = router;

// Note: Everything above here workes.
// I will block out all the code above this line for testing. 

// The code belore is for mailer

const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Setup Zoho SMTP transporter
const transporter = nodemailer.createTransport({
  host:   'smtp.zoho.com',
  port:   465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email function
async function sendConfirmationEmail(name, email) {
  return transporter.sendMail({
    from:    `"myprojectRunway" <${process.env.SMTP_USER}>`,
    to:       email,
    subject:  "We received your message at myprojectRunway!",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for contacting <b>myprojectRunway</b>! We’re excited to connect with you.<br>
      Your message was received—our team will review it and get back to you as soon as possible.</p>
      <p>Best wishes,<br>
      The myprojectRunway Team</p>
    `,
  });
}

// Contact form route
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

    const { name, email, message } = req.body;

    try {
      await new Contact({ name, email, message }).save();

      try {
        await sendConfirmationEmail(name, email);
      } catch (mailErr) {
        console.warn('⚠️ Confirmation email failed:', mailErr);
      }

      return res.status(201).json({ success: true, message: 'Message received!' });
    } catch (err) {
      console.error('Error in contact route:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error saving message',
        error: err.message,
      });
    }
  }
);

module.exports = router;
