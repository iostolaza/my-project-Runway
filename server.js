
// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// request logger
console.log('Starting server.js');
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS middleware (dynamic for prod/dev)
const allowedOrigins = [
  'https://myprojectrunway.com',
  'https://www.myprojectrunway.com',
  'http://localhost:3000',
  'http://localhost:5000'

];

// CORS middleware
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// JSON parsing middleware
app.use(express.json());

// API: Serve Google Maps Key
app.get('/api/maps-key', (req, res) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    return res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
  }
  res.status(403).json({ error: 'Forbidden' });
});

// API: Contact Form /added try-catch for error handling
try {
  app.use('/api/contact', require('./routes/contact'));
} catch (err) {
  console.error('Failed to load /api/contact:', err);
}

// Redirect front-end routes to GitHub Pages
app.get('/', (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact', (req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  
  app.use((err, req, res, next) => {
    console.error('🔥 Uncaught error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  });