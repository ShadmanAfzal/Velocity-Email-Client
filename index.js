const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

const { isAuthenticated } = require('./middlewares/auth.js');
const { authRouter } = require('./routes/authRouter.js');
const { googleStrategy } = require('./services/googleStrategy.js');
const { express_session } = require('./services/expressSession.js');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const emailRouter = require('./routes/emailRouter.js');

const DIST_DIR = path.join(__dirname, './dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(morgan('dev'));

app.use(express_session);

app.set('trust proxy', 1);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (user, done) => done(null, user));

passport.use(googleStrategy);

app.use(express.json());

app.use('/auth', authRouter);

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackMiddleware(compiler, {
      stats: {
        colors: true,
      },
      writeToDisk: true,
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use('/email', isAuthenticated, emailRouter);

app.get('/', isAuthenticated, (req, res) => res.sendFile(HTML_FILE));

app.use(express.static(DIST_DIR));

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
