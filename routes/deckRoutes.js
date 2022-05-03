const express = require('express');
const deckController = require('../controllers/deckController');

const router = express.Router();
const { verifyUser } = require('../authenticate');

router.route('/:userId').get(deckController.getAllDecks);

router.route('/').post(verifyUser, deckController.createDeck);

router
  .route('/:id')
  .get(verifyUser, deckController.getDeck)
  .patch(verifyUser, deckController.updateDeck)
  .delete(verifyUser, deckController.deleteDeck);

module.exports = router;
