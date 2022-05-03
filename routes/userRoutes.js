const express = require('express');

const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const { verifyUser } = require('../authenticate');

router.route('/signup').post(userController.signup);
router
  .route('/login')
  .post(passport.authenticate('local'), userController.login);
router.route('/refreshToken').post(userController.refreshToken);
router.route('/me').get(verifyUser, userController.me);
router.route('/logout').get(verifyUser, userController.logout);

module.exports = router;
