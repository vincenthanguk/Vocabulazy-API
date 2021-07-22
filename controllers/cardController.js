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
    const card = await Card.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        card,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCard = async (req, res) => {
  // FIXME: reference (deck) can be changed here
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        card,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// TODO:
exports.deleteCard = async (req, res) => {
  // delete reference in parent
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
