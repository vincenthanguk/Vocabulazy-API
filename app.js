const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const deckRouter = require('./routes/deckRoutes');
const cardRouter = require('./routes/cardRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// -------- MIDDLEWARES --------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mounting the router (-> apply deckRouter middleware and userRouter middleware respectively)
app.use('/api/v1/decks', deckRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/users', userRouter);

// -------- START SERVER --------
module.exports = app;
