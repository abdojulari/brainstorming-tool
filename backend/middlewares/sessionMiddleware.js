const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../db');

module.exports = session({
  store: new pgSession({
    pool,
    tableName: 'user_session',
    sidName: 'sid',
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
});
