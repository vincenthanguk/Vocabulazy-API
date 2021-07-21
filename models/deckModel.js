const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Deck must have a name!'],
    unique: true,
  },
  id: {
    type: Number,
    required: [true, 'Deck must have an id!'],
  },
  cards: Number,
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
