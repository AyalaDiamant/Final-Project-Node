const mongoose = require('mongoose');

const meetSchema = new mongoose.Schema({
  _id: Number,
  time: String,
  date: String,
  place: String,
}, {versionKey: false});

const meetModel = mongoose.model('Meet', meetSchema);

module.exports = meetModel;
