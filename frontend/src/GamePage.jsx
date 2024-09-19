// src/GamePage.jsx
import React, { useState } from 'react';
import './GamePage.css';

const GamePage = ({ questions, loading, error }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isGameFinished, setIsGameFinished] = useState(false);

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].correct_answer;

    setSelectedAnswer(answer);
    setCorrectAnswer(correctAnswer);

    if (answer === correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer('');
        setCorrectAnswer('');
      } else {
        setIsGameFinished(true);
      }
    }, 1000); // Show feedback for 1 second before moving to the next question
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
              option === selectedAnswer
                ? (option === correctAnswer ? 'correct' : 'incorrect')
                : option === correctAnswer && isGameFinished
                ? 'correct'
                : ''
            }
          >
            {option}
          </button>
        ))}
        {selectedAnswer && (
          <div>
            <p className={selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}>
              {selectedAnswer === correctAnswer ? 'Correct!' : 'Wrong!'}
            </p>
            <p>Correct Answer: {correctAnswer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="GamePage">
      <div className="scoreboard">
        <h3>Score: {score}</h3>
      </div>
      {renderQuestion()}
      {isGameFinished && <p className="finalScore">Final Score: {score}</p>}
    </div>
  );
};

export default GamePage;
