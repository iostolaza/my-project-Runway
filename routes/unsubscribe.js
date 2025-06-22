
// routes/unsubscribe.js

const express = require('express');
const router = express.Router();
const UnsubscribedEmail = require('../models/UnsubscribedEmail');
const path = require('path');

// POST: Handle form submission, save to MongoDB
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: 'No email provided.' });
  try {
    await UnsubscribedEmail.updateOne(
      { email },
      { $set: { email, unsubscribedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email){
    try {
    await UnsubscribedEmail.updateOne(
      { email },
      { $set: { email, unsubscribedAt: new Date() } },
      { upsert: true }
    );
    return res.send(`
      <html>
        <head><title>Unsubscribed</title></head>
        <body style="font-family:Garamond, 'PT Serif', Inconsolata, serif;max-width:500px;margin:0 auto;text-align:center;padding:60px 20px;">
          <h2>You have been unsubscribed.</h2>
          <p>${email} will no longer receive emails from myprojectRunway.</p>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Server error.');
  }
} else {
  // Show the form if no email in query
  res.sendFile(require('path').resolve(__dirname, '../email/unsubscribe.html'));
  }
});

module.exports = router;