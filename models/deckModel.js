const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Card = require('./cardModel');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Deck must have a name!'],
  },
  user: {
    type: String,
    required: [true, 'Deck must contain reference to a user!'],
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// middleware for removing referenced cards upon deck deletion
deckSchema.post('findOneAndDelete', async function (doc, next) {
  try {
    if (doc) {
      const deleteResult = await Card.deleteMany({
        deck: doc._id,
      });

      console.log('Card delete result: ', deleteResult);
    }
    next();
  } catch (err) {
    next(err);
  }
});

deckSchema.post('save', function (doc, next) {
  console.log('new Deck saved', doc);
  next();
});
const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
