
// routes/contact.js

// const express = require('express');
// const router  = express.Router();
// const Contact = require('../models/Contact');
// const { body, validationResult } = require('express-validator');
// const nodemailer = require('nodemailer');

// // 1) SMTP TRANSPORTER
// const transporter = nodemailer.createTransport({
//   host:   'smtp.zoho.com',
//   port:    465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER?.trim(),
//     pass: process.env.SMTP_PASS?.trim(),
//   },
// });

// async function sendConfirmationEmail(name, email) {
//   return transporter.sendMail({
//     from:    `"myprojectRunway" <${process.env.SMTP_USER}>`,
//     to:       email,
//     subject: "We received your message at myprojectRunway!",
//     html: `
//       <p>Hi ${name},</p>
//       <p>Thank you for contacting <b>myprojectRunway</b>! We’re excited to connect with you.<br>
//       Your message was received—our team will review it and get back to you as soon as possible.</p>
//       <p>Best wishes,<br>
//       The myprojectRunway Team</p>
//     `,
//   });
// }

// // 2) ROUTE HANDLER
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
//       // a) Save to MongoDB
//       await new Contact({ name, email, message }).save();

//       // b) Try sending email—but never block the 201 response
//       if (process.env.SMTP_USER && process.env.SMTP_PASS) {
//         try {
//           await sendConfirmationEmail(name, email);
//         } catch (emailErr) {
//           console.warn('⚠️ Confirmation email failed:', emailErr);
//         }
//       } else {
//         console.warn('⚠️ SMTP not configured; skipping confirmation email.');
//       }

//       // c) Always respond 201
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

// routes/contact.js

const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');

// POST /api/contact
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