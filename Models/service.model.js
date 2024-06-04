const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  _id: Number,
  price: String,
  description: String,
}, {versionKey: false});

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
