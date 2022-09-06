const express = require('express');
const studysessionController = require('../controllers/studysessionController');

const router = express.Router();
const { verifyUser } = require('../authenticate');

router
  .route('/')
  .get(verifyUser, studysessionController.getAllStudysessions)
  .post(verifyUser, studysessionController.createStudysession)
  .delete(verifyUser, studysessionController.deleteAllStudysessions);

module.exports = router;
