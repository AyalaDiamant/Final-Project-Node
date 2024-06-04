const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  password: String,
  email: String,
}, {versionKey: false});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
