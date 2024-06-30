const mongoose = require('mongoose');

const meetSchema = new mongoose.Schema({
  _id: Number,
  userId: Number,
  time: String,
  date: String,
  place: String,
  common: String
}, {versionKey: false});

const meetModel = mongoose.model('Meet', meetSchema);

module.exports = meetModel;
