const express = require('express');
const passport = require('./middlewares/passportMiddleware');
const UserController = require('./controllers/userController');

const router = express.Router();

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid username or password',
      });
    }

    return req.logIn(user, (loginError) => {
      if (loginError) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Login failed',
        });
      }
      return next();
    });
  })(req, res, next);
};

router.post('/join', UserController.join);
router.post('/login', authenticateUser, UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
