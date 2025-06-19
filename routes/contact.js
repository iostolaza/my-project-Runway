// DEBUG: Did I change this?

// routes/contact.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
const { body, validationResult } = require('express-validator');

// Configure nodemailer once at the top
const transporter = nodemailer.createTransport({
   host: 'smtp.zoho.com',
    port: 465,
   secure: true,                // TLS
    auth: {
      user: (process.env.SMTP_USER || '').trim(),
      pass: (process.env.SMTP_PASS || '').trim(),
    },
  });

async function sendConfirmationEmail(name, email) {
  return transporter.sendMail({
    from: '"myprojectRunway" <no-reply@myprojectrunway.com>',
    to: email,
    subject: "We received your message at myprojectRunway!",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for contacting <b>myprojectRunway</b>! We’re excited to connect with you.<br>
      Your message was received—our team will review it and get back to you as soon as possible.</p>
      <p>Best wishes,<br>
      The myprojectRunway Team</p>
    `
  });
}

// Main contact route /api/contact
// POST Validate, saves contact, sends confirmation email
// 1. Validate input
// 2. Save to MongoDB
// 3. Send confirmation email

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

      // 1. Save to MongoDB
      await new Contact({ name, email, message }).save();

           // 2) Try to send confirmation, but don’t let it block the response
    try {
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
          await sendConfirmationEmail(name, email);
        } else {
         console.warn('SMTP not configured; skipping confirmation email.');
       }
     } catch (emailErr) {
         console.error('⚠️ Confirmation email error:', emailErr);
       }
      // 3) Always tell the client “201”
     return res.status(201).json({ success: true, message: 'Message received!' });


    } catch (err) {
      // 4. Error handling (important for debugging and user feedback)
      console.error('Error in contact route:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to save message or send email',
        error: err.message,
      });
    }
  }
);

module.exports = router;


// legacy code snippet
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
//     try {
//       const { name, email, message } = req.body;
//       const contact = new Contact({ name, email, message });
//       await contact.save();
//       res.status(201).json({ success: true, message: 'Message received!' });
//     } catch (err) {
//       res.status(400).json({ success: false, message: 'Failed to save', error: err.message });
//     }
//   }
// );

// module.exports = router;

// adding for contact form validation and email sending