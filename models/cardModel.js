const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const cardSchema = new Schema(
  {
    cardFront: {
      type: String,
      maxLength: [100, 'Card Front must be 100 characters or less!'],
      required: [true, 'Card must have a frontside text'],
    },
    cardBack: {
      type: String,
      maxLength: [100, 'Card Back must be 100 characters or less!'],
      required: [true, 'Card must have a backside text'],
    },
    deck: {
      type: Schema.Types.ObjectId,
      ref: 'Deck',
      required: [true, 'Card must contain reference to a deck'],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
