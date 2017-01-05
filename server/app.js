'use strict';
const glob = require('glob');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const config = require('./config');
const api = require('./api');
const auth = require('./auth');

const models = glob.sync(`${config.root}/models/*.js`);
models.forEach(model => require(model));
mongoose.connect(config.db);

const db = mongoose.connection;
db.on('error', err => console.log('unable to connect to database', err));

require('./passport')(passport);

const app = express();
require('./express')(app, passport);

app.use('/api', api);
app.use('/auth', auth);

require('./errorHandler')(app);

app.listen(config.port, () => console.log(`App is up! Port: ${config.port}`));
