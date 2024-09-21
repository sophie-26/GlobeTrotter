// src/DifficultySelection.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';

const DifficultySelection = ({ mode }) => {
  const history = useHistory();

  const handleDifficultySelect = (difficulty) => {
    history.push(`/game?mode=${mode}&difficulty=${difficulty}`);
  };

  return (
    <div>
      <h2>Select Difficulty Level</h2>
      <button onClick={() => handleDifficultySelect('easy')}>Easy</button>
      <button onClick={() => handleDifficultySelect('medium')}>Medium</button>
      <button onClick={() => handleDifficultySelect('hard')}>Hard</button>
    </div>
  );
};

export default DifficultySelection;
