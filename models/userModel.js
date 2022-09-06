const mongoose = require('mongoose');
const { Schema } = mongoose;
const Deck = require('./deckModel');
const Card = require('./cardModel');
const Studysession = require('./studysessionModel');

const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const User = new Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    decks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
      },
    ],
    studysessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Studysession',
      },
    ],
    authStrategy: {
      type: String,
      default: 'local',
    },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

// middleware for removing referenced decks, cards and studysessions upon user deletion
User.post('findOneAndDelete', async function (doc, next) {
  try {
    console.log(doc._id);
    if (doc) {
      const deckDeleteResult = await Deck.deleteMany({
        user: doc._id,
      });

      const cardDeleteResult = await Card.deleteMany({
        user: doc._id,
      });

      const deleteStudysessionResult = await Studysession.deleteMany({
        user: doc._id,
      });

      console.log('Deck delete result: ', deckDeleteResult);
      console.log('Card delete result: ', cardDeleteResult);
      console.log('Studysession delete result: ', deleteStudysessionResult);
    }
    next();
  } catch (err) {
    next(err);
  }
});

//Remove refreshToken from the response
User.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
