const session = require('express-session');

const express_session = session({
  name: 'emailClient',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
});

module.exports = { express_session };
