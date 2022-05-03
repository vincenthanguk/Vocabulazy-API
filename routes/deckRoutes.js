const express = require('express');
const deckController = require('../controllers/deckController');

const router = express.Router();

router.route('/:userId').get(deckController.getAllDecks);

router.route('/').post(deckController.createDeck);

router
  .route('/:id')
  .get(deckController.getDeck)
  .patch(deckController.updateDeck)
  .delete(deckController.deleteDeck);

module.exports = router;
