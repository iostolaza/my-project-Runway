
// server.js

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const app  = express();
const PORT = process.env.PORT || 5000;

// 1) REQUEST LOGGER (first)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// 2) CORS + preflight
const allowedOrigins = [
  'https://myprojectrunway.com',
  'https://www.myprojectrunway.com',
  'http://localhost:3000',
  'http://localhost:5000',
];
app.use(cors({
  origin:  (origin, cb) =>
    !origin || allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error('Not allowed by CORS')),
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());

// 3) JSON BODY PARSER
app.use(express.json());

// 4) MAPS KEY ENDPOINT
app.get('/api/maps-key', (req, res) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    return res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
  }
  res.status(403).json({ error: 'Forbidden' });
});

// 5) CONTACT FORM ROUTE
app.use('/api/contact', require('./routes/contact'));

// 6) REDIRECT ANY “FRONT-END” ROUTES
app.get('/',       (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact',(req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// 7) MONGODB + LISTEN
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 8) GLOBAL ERROR HANDLER (last)
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});
