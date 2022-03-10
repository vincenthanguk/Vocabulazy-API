const Deck = require('../models/deckModel');

exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find().populate('cards');

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
    const deck = await Deck.findById(req.params.id).populate('cards');
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
      message: err,
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

exports.deleteDeck = async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id);
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
