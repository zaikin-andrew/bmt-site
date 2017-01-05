'use strict';

const router = require('express').Router();

module.exports = router;

const responseMessages = {
  authError: 'missing authorization'
};

function errorResponse (res, err) {
  if (process.env.NODE_ENV === 'production') {
    console.log('Error: ', err); // FIXME move to 3rd party service
  } else {
    console.log('Error: ', err.body && err.body.message || err);
  }
  res.status(err.statusCode || 401).send(err || responseMessages.authError);
}
