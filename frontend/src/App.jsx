// src/App.jsx
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './HomePage';

// GamePage Component
const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null); // Track user answer
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track correct answer
  const [answered, setAnswered] = useState(false); // Track if an answer has been submitted

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const difficulty = query.get('difficulty') || 'easy';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/questions?difficulty=${difficulty}`);
        setQuestions(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestion].correct_answer;
    setUserAnswer(selectedAnswer);
    setCorrectAnswer(correctAnswer);
    setAnswered(true);

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    // Delay moving to the next question and resetting states
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setUserAnswer(null);
        setCorrectAnswer(null);
        setAnswered(false);
      }, 1500); // Adjust delay if needed
    } else {
      setIsGameFinished(true);
    }
  };

  const renderQuestion = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (isGameFinished) return <p>Game Over! Your score: {score}</p>;

    const { question, incorrect_answers, correct_answer } = questions[currentQuestion];
    const options = [...incorrect_answers, correct_answer].sort();

    return (
      <div>
        <h2>{question}</h2>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={
              answered
                ? (option === correctAnswer ? 'correct-answer' : (option === userAnswer ? 'incorrect' : ''))
                : ''
            }
          >
            {option}
          </button>
        ))}
        {answered && (
          <div>
            <p className={userAnswer === correctAnswer ? 'correct' : 'incorrect'}>
              {userAnswer === correctAnswer ? 'Correct!' : 'Wrong!'}
            </p>
            {userAnswer !== correctAnswer && <p>Correct Answer: {correctAnswer}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="GamePage">
      <h1>Geography Trivia Game</h1>
      {renderQuestion()}
      {!isGameFinished && <p>Score: {score}</p>}
    </div>
  );
};

// App Component
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default App;
