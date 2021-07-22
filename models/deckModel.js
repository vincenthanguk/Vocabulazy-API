const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Deck must have a name!'],
    unique: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
