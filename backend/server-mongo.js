// backend/server-mongo.js

console.log('💡 Starting server-mongo.js');
require('dotenv').config();
console.log('💡 ENV:', {
  MONGO_URI: process.env.MONGO_URI,
  PORT:     process.env.PORT
});


require('dotenv').config();
const express    = require('express');
const cors       = require('cors');      // ← import cors
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const Inquiry   = require('./models/Inquiry.js');
const Location  = require('./models/Location.js');

const app = express();
app.use(cors());      
app.use(bodyParser.json());

// 1) Connect to MongoDB Atlas (no extra options needed)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// 2) POST endpoint for form submissions
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();
    res.status(201).json({ success: true, id: inquiry._id });
  } catch (err) {
    console.error('Save Inquiry Error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 3) Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
