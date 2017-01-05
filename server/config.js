'use strict';

const config = {
  db: 'mongodb://localhost/bmt',
  port: process.env.PORT || 3001,
  root: require('path').normalize(__dirname),
  host: 'http://localhost:3000',
  sessionCollection: 'sessions',
  sessionSecret: 'p8zztgch48rehu79jskhm6aj3',
  admin: {
    email: 'zaikin.andry@gmail.com'
  },
  github: {
    clientID: '460143f8a2e296b90866',
    clientSecret: 'cb0e09a704c057cdb5eb63afa69c14b9c460f8b0',
    callbackURL: '/auth/github/callback'
  },
  hubstaff: {
    app_token: 'SmtoJT1ZnzjdLWUwoqvl94xThMZucFoS5l03wTwZ1wQ',
    auth_token: 'P86SySAh0t_ut17wsZ1QgCTgvekPDKe7dTefIpOTj70'
  },
  mailer: {
    from: 'support@bestmood.tech',
    options: {
      service: 'Mailgun',
      user: 'postmaster@sandbox634ff693d07042ce855f9b6224c753e1.mailgun.org',
      pass: '9c7e77a8ca9bce9d09ad2bc5e924449b'
    }
  }
};

module.exports = config;
