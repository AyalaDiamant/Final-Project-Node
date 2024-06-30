const mongoose = require('mongoose');
const userModel = require('./user.model');

const meetSchema = new mongoose.Schema({
  _id: Number,
  userId: Number,
  time: String,
  date: String,
  place: String,
}, {versionKey: false});

const meetModel = mongoose.model('Meet', meetSchema);

module.exports = meetModel;
