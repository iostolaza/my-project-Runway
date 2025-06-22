
//Contact.js

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Contact', ContactSchema);


// models/UnsubscribedEmail.js
const mongoose = require('mongoose');
const UnsubscribedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  unsubscribedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('UnsubscribedEmail', UnsubscribedEmailSchema);
