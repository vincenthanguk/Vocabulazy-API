const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const studysessionSchema = new mongoose.Schema(
  {
    totalCards: {
      type: Number,
      required: [true, 'Session must contain Cards'],
    },
    correctCards: {
      type: Number,
      default: 0,
      required: [true, 'Session must contain number of correct cards'],
    },
    wrongCards: {
      type: Number,
      default: 0,
      required: [true, 'Session must contain number of wrong cards'],
    },
    user: {
      type: String,
      required: [true, 'Session must contain reference to a user!'],
    },
    deck: {
      type: String,
      required: [true, 'Session must contain reference to a Deck!'],
    },
  },
  { timestamps: true }
);

const Studysession = mongoose.model('Studysession', studysessionSchema);

module.exports = Studysession;
