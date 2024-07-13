const { default: RedisStore } = require('connect-redis');
const redis = require('redis');
const session = require('express-session');

const REDIS_URL = process.env.REDIS_URL;

const redisClient = redis.createClient({
  url: REDIS_URL,
});

redisClient.connect();

const express_session = session({
  name: 'emailClient',
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
});

module.exports = { express_session };
