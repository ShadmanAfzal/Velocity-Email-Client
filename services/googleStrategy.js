const strategy = require('passport-google-oauth20');
const axios = require('axios');

const GoogleStrategy = strategy.Strategy;

const googleStrategy = new GoogleStrategy(
  {
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async (access_token, refresh_token, _, done) => {
    const profile = await fetchProfileInfo(access_token, refresh_token);
    return done(null, profile);
  },
);

const fetchProfileInfo = async (acces_token, refresh_token) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: 'Bearer ' + acces_token,
        },
      },
    );

    return {
      access_token: acces_token,
      email: response.data.email,
      email_verified: response.data.email_verified,
      name: response.data.name,
      profilePicture: response.data.picture,
      refresh_token: refresh_token,
    };
  } catch (error) {
    console.log('Error occured while fetching user info', error);
  }
};

module.exports = { googleStrategy };
