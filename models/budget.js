const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new Schema({
  totalBudget: { type: Number, required: true }
})

module.exports = mongoose.model('Budget', Budget)