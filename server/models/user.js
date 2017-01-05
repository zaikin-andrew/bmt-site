'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
  username: { type: String, unique: true },
  firstName: { type: String, default: 'Change' },
  lastName: { type: String, default: 'name' },
  password: String,
  gender: { type: String, default: null },
  birth: Date,
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, unique: true },
  resetToken: String,
  githubId: String,
  githubToken: String
});

User.methods.validPassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', User);
