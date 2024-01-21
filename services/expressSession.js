const { default: RedisStore } = require('connect-redis');
const redis = require('redis');
const session = require('express-session');

const redisClient = redis.createClient(6379, 'localhost');

redisClient.connect();

const express_session = session({
  name: 'emailClient',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  // cookie: {
  //   secure: false,
  //   maxAge: 86400000,
  // },
  // store: new RedisStore({
  //   client: redisClient,
  // }),
});

module.exports = { express_session };
