const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

const { verifyUser } = require('../authenticate');

router
  .route('/')
  // .get(cardController.getAllCards)
  .post(verifyUser, cardController.createCard);

router
  .route('/:id')
  .get(verifyUser, cardController.getCard)
  .patch(verifyUser, cardController.updateCard)
  .delete(verifyUser, cardController.deleteCard);

module.exports = router;
