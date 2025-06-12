require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Firestore, Timestamp } = require('@google-cloud/firestore');

const app = express();
app.use(bodyParser.json());

// 1) Init Firestore
const firestore = new Firestore({
  projectId: process.env.PROJECT_ID,
  // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS // auto via env var
});

// 2) POST endpoint
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const docRef = firestore.collection('inquiries').doc();
    await docRef.set({
      name,
      email,
      message,
      createdAt: Timestamp.now()
    });
    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('Firestore Error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 3) Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Firestore server on ${PORT}`));
