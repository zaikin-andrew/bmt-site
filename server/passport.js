'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('./config');

const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;

module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id, done));

  passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email: email })
      .catch(err => done(err))
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        user.validPassword(password)
          .then(valid => {
            if (valid) return done(null, user);
            done(null, false, { message: 'Incorrect password.' });
          });
      });
  }));
  //    Define the facebook auth strategy
  passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: `${config.host}auth/github/callback`

  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ email: profile.emails[0].value })
        .catch(err => done(err))
        .then(user => {
          if (user) {
            if (user.githubId === profile.id) {
              return done(null, user);
            }
            user.githubId = profile.id;
            user.githubToken = token;
            user.save(done);
          } else {
            let newUser = new User({
              username: profile.emails[0].value,
              githubId: profile.id,
              githubToken: token,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value
            });
            newUser.save(done);
          }
        });
    });
  }));
};
