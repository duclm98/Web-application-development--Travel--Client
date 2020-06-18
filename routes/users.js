var express = require('express');
var router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

router.get('/signUp', users.signUp);
router.post('/signUp', users.signUpPost);

router.get('/login', users.loginGet);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}));

router.get('/logout', users.logout);

module.exports = router;
