// models.js
const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  score: { type: Number, required: true }
});

const GameResult = mongoose.model('GameResult', gameResultSchema);

module.exports = GameResult;