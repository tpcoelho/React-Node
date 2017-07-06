var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var User = require('../model/user');
var config = require('./oauth.js');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

module.exports = function(passport) {
    passport.use(new GithubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ oauthID: profile.id }, function(err, user) {
          if(err) {
            console.log(err);  // handle errors!
             done(err, false);
          }

          if (user !== null) {
            //Usuario ja existe
            done(null, user);
          } else {
            //Cria usuario
            user = new User({
              oauthID: profile.id,
              name: profile.username,
              accessToken: accessToken,
              created: Date.now()
            });
            user.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
                done(err, false);
              } else {
                console.log("saving user ...");
                done(null, user);
              }
            });
          }
        });
      }
    ));
};