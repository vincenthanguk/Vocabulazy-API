const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const User = require('./models/user');

const deckRouter = require('./routes/deckRoutes');
const cardRouter = require('./routes/cardRoutes');
const studysessionRouter = require('./routes/studysessionRoutes');

require('./strategies/JwtStrategy');
require('./strategies/LocalStrategy');
require('./authenticate');

const userRouter = require('./routes/userRoutes');

const app = express();

// -------- MIDDLEWARES --------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(cors());
// app.options('*', cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(',')
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

app.use(passport.initialize());

app.use('/api/v1/decks', deckRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/studysession', studysessionRouter);

// -------- START SERVER --------
module.exports = app;
