const Card = require('../models/cardModel');
const Deck = require('../models/deckModel');

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();

    res.status(200).json({
      status: 'success',
      data: {
        cards,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    const newCard = await Card.create(req.body);

    const deck = await Deck.findById({ _id: newCard.deck });
    deck.cards.push(newCard);
    await deck.save();

    res.status(201).json({
      status: 'success',
      data: {
        card: newCard,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCard = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCard = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
