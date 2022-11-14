const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Envelope = new Schema({
  category: { type: String, required: true },
  cost: { type: Number, required: true },
})

module.exports = mongoose.model('envelope', Envelope)