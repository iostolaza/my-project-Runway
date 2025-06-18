// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');



// Middleware
app.use(cors({
  origin: ['https://myprojectrunway.com', 'https://www.myprojectrunway.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cors({
  origin: [
    'https://myprojectrunway.com',
    'https://www.myprojectrunway.com'
  ],
  methods: ['GET','POST']
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/contact', require('./routes/contact'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
