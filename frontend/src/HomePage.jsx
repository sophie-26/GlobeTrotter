// src/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty
  const [isDifficultySelected, setIsDifficultySelected] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/game?difficulty=${difficulty}`);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDifficultySelected(true);
  };

  return (
    <div className="HomePage">
      <h1>Welcome to the Geography Trivia Game</h1>
      <p>Test your geography knowledge!</p>
      
      {!isDifficultySelected ? (
        <form onSubmit={handleSubmit}>
          <h2>Select Difficulty Level</h2>
          <label>
            <input
              type="radio"
              value="easy"
              checked={difficulty === 'easy'}
              onChange={handleDifficultyChange}
            />
            Easy
          </label>
          <label>
            <input
              type="radio"
              value="medium"
              checked={difficulty === 'medium'}
              onChange={handleDifficultyChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="hard"
              checked={difficulty === 'hard'}
              onChange={handleDifficultyChange}
            />
            Hard
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={handleStartGame}>Start Game</button>
      )}
    </div>
  );
}

export default HomePage;
