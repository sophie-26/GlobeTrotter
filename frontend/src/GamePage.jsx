import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import './GamePage.css';

function decodeHtml(html) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');
  return dom.body.textContent || '';
}

const GamePage = ({ questions, loading, error }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctCount, setCorrectCount] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintWrongAnswer, setHintWrongAnswer] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
  const difficulty = queryParams.get('difficulty') || 'easy';

  const filteredQuestions = questions.filter(question => question.difficulty === difficulty);

  useEffect(() => {
    const savedHighestScore = localStorage.getItem(`highestScore_${mode}_${difficulty}`);
    if (savedHighestScore) {
      setHighestScore(parseInt(savedHighestScore, 10));
    }
  }, [mode, difficulty]);

  useEffect(() => {
    let timer;

    if (!isGameFinished) {
      timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(prev => prev - 1);
        } else {
          handleTimeout();
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isGameFinished]);

  const handleTimeout = () => {
    setSelectedAnswer('');
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < filteredQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setTimeLeft(15); // Reset timer to 15 seconds for each new question
        resetHint();
      } else {
        finishGame();
      }
    }, 1000);
  };

  const handleAnswer = (answer) => {
    const correctAnswerText = filteredQuestions[currentQuestion]?.correct_answer;

    setSelectedAnswer(answer);

    if (answer === correctAnswerText) {
      setCorrectCount(prevCount => prevCount + 1);
      const points = 100 - (15 - timeLeft) * 5; // Scoring based on remaining time
      setScore(score + points);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < filteredQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer('');
        setTimeLeft(15); // Ensure timer resets here as well
        resetHint();
      } else {
        finishGame();
      }
    }, 1000);
  };

  const resetHint = () => {
    setHintUsed(false);
    setHintWrongAnswer('');
  };

  const finishGame = () => {
    setIsGameFinished(true);
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem(`highestScore_${mode}_${difficulty}`, score);
      alert(`New High Score! Your highest score for ${mode} mode on ${difficulty} difficulty is now ${score}.`);
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      const { incorrect_answers } = filteredQuestions[currentQuestion];
      const randomWrongAnswer = incorrect_answers[Math.floor(Math.random() * incorrect_answers.length)];
      setHintWrongAnswer(randomWrongAnswer);
      setHintUsed(true);
    }
  };

  const renderQuestion = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (isGameFinished) return <p>Game Over! Your score: {score}. Correct Answers: {correctCount} out of {filteredQuestions.length}. Highest Score: {highestScore}</p>;
    if (!filteredQuestions[currentQuestion]) return <p>No questions available</p>;

    const { question, incorrect_answers, correct_answer } = filteredQuestions[currentQuestion];
    const options = [...incorrect_answers, correct_answer].sort();

    return (
      <div>
        <h2>{decodeHtml(question)}</h2>
        {options.map((option, index) => {
          let className = '';
          if (selectedAnswer) {
            if (option === correct_answer) {
              className = 'correct';
            } else if (option === selectedAnswer) {
              className = 'incorrect';
            }
          }
          if (hintWrongAnswer === option) {
            className = 'hint-wrong';
          }

          return (
            <button key={index} className={className} onClick={() => handleAnswer(option)}>
              {decodeHtml(option)}
            </button>
          );
        })}
        {selectedAnswer && (
          <p>
            {selectedAnswer === correct_answer ? 'Correct!' : 'Wrong!'} Correct Answer: {decodeHtml(correct_answer)}
          </p>
        )}
        {!selectedAnswer && hintUsed && (
          <p>Hint used! A wrong answer has been highlighted.</p>
        )}
      </div>
    );
  };

  return (
    <div className="GamePage">
      <div className="scoreboard">
        <h3>Score: {score}</h3>
        <h3>Time Left: {timeLeft}s</h3>
        <h3>Correct Answers: {correctCount} out of {currentQuestion + 1}</h3>
      </div>
      <button className="hint-btn" onClick={handleHint} disabled={isGameFinished || hintUsed}>
        <FiHelpCircle /> Use Hint
      </button>
      {renderQuestion()}
    </div>
  );
};

export default GamePage;
