// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 8080;
const axios = require('axios');

const app = express();
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model
const scoreSchema = new mongoose.Schema({
  score: Number,
});

const Score = mongoose.model('Score', scoreSchema);

// Route to fetch geography questions based on difficulty
app.get('/api/questions', async (req, res) => {

  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=22&type=multiple`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Route to save score
app.post('/api/save-score', async (req, res) => {
  const { score } = req.body;
  try {
    const newScore = new Score({ score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error saving score:', error.message);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});