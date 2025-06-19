
// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware (dynamic for prod/dev)
const allowedOrigins = [
  'https://myprojectrunway.com',
  'https://www.myprojectrunway.com',
  'http://localhost:5000',
  'http://localhost:3000'
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

app.options('*', cors());

// JSON parsing middleware
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// API: Serve Google Maps Key
app.get('/api/maps-key', (req, res) => {
  if (!req.headers.origin || allowedOrigins.includes(req.headers.origin)) {
    return res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
  }
  res.status(403).json({ error: 'Forbidden' });
});

// API: Contact Form
app.use('/api/contact', require('./routes/contact'));

// Redirect front-end routes to GitHub Pages
app.get('/', (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact', (req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
