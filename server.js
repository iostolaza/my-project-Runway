
// server.js

require('dotenv').config();
const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app  = express();
const PORT = process.env.PORT || 5001;

// REQUEST LOGGER
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// CORS + preflight
const allowedOrigins = [
  'https://myprojectrunway.com',
  'https://www.myprojectrunway.com'
];

app.use((req, res, next) => {
  console.log(
    `Incoming request from Origin: ${req.headers.origin} | Method: ${req.method} | Path: ${req.url}`
  );
  next();
});

app.use(cors({
  origin: function(origin, callback){
    console.log('[CORS] Origin received:', origin);
    if (!origin) {
      console.log('[CORS] No origin header, allowing request');
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = '[CORS] Rejected origin: ' + origin;
      console.log(msg);
      return callback(new Error(msg), false);
    }
    console.log('[CORS] Allowed origin:', origin);
    return callback(null, true);
  }
}));

app.options('*', cors(), (req, res) => {
  console.log('[CORS] Preflight OPTIONS handled for:', req.headers.origin);
  res.sendStatus(204);
});
app.use(express.json());

// JSON BODY PARSER
app.use('/terms', express.static('terms'));
app.use('/runway', express.static('runway'));
app.use('/about', express.static('about'));
app.use('/contact', express.static('contact'));
app.use('/email', express.static('email'));
app.use('/stylecss', express.static('stylecss'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

// CONTACT FORM ROUTE
app.use('/api/contact', require('./routes/contact'));

// REDIRECT ANY “FRONT-END” ROUTES
app.get('/',       (req, res) => res.redirect(302, 'https://myprojectrunway.com'));
app.get('/contact',(req, res) => res.redirect(302, 'https://myprojectrunway.com/contact/'));

// MONGODB + LISTEN
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// GLOBAL ERROR HANDLER (last)
app.use((err, req, res, next) => {
  console.error('Uncaught error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

const unsubscribeRoute = require('./routes/unsubscribe');
app.use('/unsubscribe', unsubscribeRoute);

