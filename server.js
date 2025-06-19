
// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(cors({
  origin: ['https://myprojectrunway.com', 'https://www.myprojectrunway.com'],
  methods: ['GET', 'POST','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

// JSON parsing middleware
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Redirect front-end routes to GitHub Pages
app.get('/', (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact', (req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// API routes
app.use('/api/contact', require('./routes/contact'));

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  
  app.get('/api/maps-key', (req, res) => {
    const allowed = [
      'https://myprojectrunway.com',
      'https://www.myprojectrunway.com'
    ];
    if (!allowed.includes(req.headers.origin)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
  });