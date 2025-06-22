
// models/UnsubscribedEmail.js

const mongoose = require('mongoose');

const UnsubscribedEmailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    unsubscribedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.models.UnsubscribedEmail || mongoose.model('UnsubscribedEmail', UnsubscribedEmailSchema);
  