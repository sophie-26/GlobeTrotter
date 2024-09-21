import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { FiInfo } from 'react-icons/fi';

const HomePage = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [highScores, setHighScores] = useState({
    regular_easy: 0,
    regular_medium: 0,
    regular_hard: 0,
  });
  const [showInfo, setShowInfo] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const regularEasyScore = localStorage.getItem('highestScore_regular_easy') || 0;
    const regularMediumScore = localStorage.getItem('highestScore_regular_medium') || 0;
    const regularHardScore = localStorage.getItem('highestScore_regular_hard') || 0;

    setHighScores({
      regular_easy: parseInt(regularEasyScore, 10),
      regular_medium: parseInt(regularMediumScore, 10),
      regular_hard: parseInt(regularHardScore, 10),
    });
  }, []);

  const startGame = () => {
    navigate(`/game?mode=regular&difficulty=${difficulty}`);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="HomePage">
      <div className="high-scores-box">
        <h3>High Scores</h3>
        <p>Regular (Easy): {highScores.regular_easy}</p>
        <p>Regular (Medium): {highScores.regular_medium}</p>
        <p>Regular (Hard): {highScores.regular_hard}</p>
      </div>

      <div className="info-icon" onClick={toggleInfo}>
        <FiInfo size={30} />
      </div>

      {showInfo && (
        <div className="info-box">
          <h4>Game Mode Information</h4>
          <p> Try to answer questions as accurately as possible! The quicker you answer the question, the more points you will receive. There are three modes: easy, medium, and hard, which will determine the difficulty level of the questions you receive.</p>
        </div>
      )}

      <h1>GlobeTrotter Trivia</h1>
      <h2>Trot across the glob and test your geography knowledge!</h2>
      
      <h2>Select Difficulty</h2>
      <div className="difficulty-group">
        <button onClick={() => setDifficulty('easy')}>Easy</button>
        <button onClick={() => setDifficulty('medium')}>Medium</button>
        <button onClick={() => setDifficulty('hard')}>Hard</button>
      </div>
      
      <button onClick={startGame}>Start</button>
    </div>
  );
};

export default HomePage;
