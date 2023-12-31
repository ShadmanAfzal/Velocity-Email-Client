const express = require('express');
const passport = require('passport');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const authRouter = express.Router();

authRouter.get(
  '/login',
  passport.authenticate('google', {
    scope: ['email', 'profile', 'https://mail.google.com/'],
  })
);

authRouter.get('/failure', (_, res) => {
  res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
});

authRouter.get('/user', async (req, res) => {
  if (req.isAuthenticated()) return res.send(req.user);

  return res.status(StatusCodes.UNAUTHORIZED).send();
});

authRouter.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
    successRedirect: '/',
    failureMessage: true,
  })
);

module.exports = { authRouter };
