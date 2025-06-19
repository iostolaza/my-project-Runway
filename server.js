
// server.js

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');

const app  = express();
const PORT = process.env.PORT || 5000;

// 1) LOGGER — first!
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2) CORS + preflight
const allowedOrigins = [
  'https://myprojectrunway.com',
  'https://www.myprojectrunway.com',
  'http://localhost:3000',
  'http://localhost:5000'
];
app.use(cors({
  origin:  (o, cb) => !o || allowedOrigins.includes(o)
    ? cb(null, true)
    : cb(new Error('Not allowed by CORS')),
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());

// 3) JSON parser
app.use(express.json());

// 5) API: Google Maps Key
app.get('/api/maps-key', (req, res) => {
  const o = req.headers.origin;
  if (!o || allowedOrigins.includes(o)) {
    return res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
  }
  res.status(403).json({ error: 'Forbidden' });
});

// 6) API: Contact Form
app.use('/api/contact', require('./routes/contact'));

// 7) Redirect any other front-end routes
app.get('/',      (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact',(req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// 8) Connect Mongo & start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 9) Global error handler (last)
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});
