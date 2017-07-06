var express = require('express');
var passport = require('passport');

var router = express.Router();
var actions = require('../metodos/actions');

router.get('/ping', passport.authenticate('github'), actions.ping);

router.get('/auth/github', passport.authenticate('github'), function(req, res){});
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: "/" }), actions.login);

module.exports = router;