const express = require('express');
const morgan = require('morgan');

const deckRouter = require('./routes/deckRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// NOTE: -------- MIDDLEWARES --------

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('HELLO FROM THE MIDDLEWARE');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------- HANDLERS (/Controllers) --------

// -------- ROUTES --------
// app.get('/api/v1/decks', getAllDecks);
// app.post('/api/v1/decks', createDeck);
// app.get('/api/v1/decks/:id', getDeck);
// app.patch('/api/v1/decks/:id', updateDeck);
// app.delete('/api/v1/decks/:id', deleteDeck);
// --- slicker and more readable version below ---

// mounting the router (-> apply deckRouter middleware and userRouter middleware respectively)
app.use('/api/v1/decks', deckRouter);
app.use('/api/v1/users', userRouter);

// -------- START SERVER --------
module.exports = app;
