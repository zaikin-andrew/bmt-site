'use strict';
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const compress = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')({
  session: session
});
const config = require('./config');

module.exports = function (app, passport) {
  app.use(compress());

  // Showing stack errors
  app.set('showStackError', true);
  app.set('view engine', 'pug');
  app.use(morgan('dev'));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: config.sessionCollection
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // Use helmet to secure Express headers
  app.use(helmet());
  app.disable('x-powered-by');
};
