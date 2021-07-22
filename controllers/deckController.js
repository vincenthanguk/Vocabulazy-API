const Deck = require('../models/deckModel');

exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: decks.length,
      data: {
        decks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    // === Deck.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        deck,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDeck = async (req, res) => {
  try {
    const newDeck = await Deck.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        deck: newDeck,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateDeck = async (req, res) => {
  try {
    const deck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deck,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDeck = (req, res) => {
  if (req.params.id * 1 > decks.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
