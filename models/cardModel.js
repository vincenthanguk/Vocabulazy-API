const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const cardSchema = new Schema({
  cardFront: {
    type: String,
    required: [true, 'Card must have a frontside text'],
  },
  cardBack: {
    type: String,
    required: [true, 'Card must have a backside text'],
  },
  deck: {
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    required: [true, 'Card must contain reference to a deck'],
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
