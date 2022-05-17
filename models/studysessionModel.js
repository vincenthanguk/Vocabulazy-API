const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const studysessionSchema = new mongoose.Schema(
  {
    totalCards: {
      type: Number,
      required: [true, 'Studysession must contain Cards!'],
    },
    correctCards: {
      type: Number,
      default: 0,
      required: [true, 'Studysession must contain number of correct cards!'],
    },
    wrongCards: {
      type: Number,
      default: 0,
      required: [true, 'Studysession must contain number of wrong cards!'],
    },
    totalTime: {
      type: Number,
      required: [true, 'Studysession must contain elapsed time!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Studysession must contain reference to a user!'],
    },
    deck: {
      type: Schema.Types.ObjectId,
      ref: 'Deck',
      required: [true, 'Studysession must contain reference to a Deck!'],
    },
  },
  { timestamps: true }
);

const Studysession = mongoose.model('Studysession', studysessionSchema);

module.exports = Studysession;
