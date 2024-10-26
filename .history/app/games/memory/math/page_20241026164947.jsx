"use client";

import React, { useState, useEffect } from 'react';

const MathGame = () => {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [cognitiveState, setCognitiveState] = useState('stable');

  useEffect(() => {
    generateProblem();
  }, [difficulty]);

  const generateProblem = async () => {
    try {
      const response = await fetch('/api/generate-math-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty }),
      });
      const data = await response.json();
      setProblem(data.problem);
    } catch (error) {
      console.error('Error generating problem:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === problem.answer) {
      setScore(score + 1);
      updateDifficulty(true);
    } else {
      updateDifficulty(false);
    }
    setUserAnswer('');
    generateProblem();
  };

  const updateDifficulty = (correct) => {
    if (correct) {
      setDifficulty((prevDifficulty) => Math.min(prevDifficulty + 1, 10));
      setCognitiveState('improving');
    } else {
      setDifficulty((prevDifficulty) => Math.max(prevDifficulty - 1, 1));
      setCognitiveState('struggling');
    }

    setTimeout(() => setCognitiveState('stable'), 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Math Game</h1>
      <p className="mb-2">Score: {score}</p>
      <p className="mb-2">Difficulty: {difficulty}</p>
      <p className="mb-4">Cognitive State: {cognitiveState}</p>
      {problem && (
        <form onSubmit={handleSubmit} className="mb-4">
          <p className="text-lg mb-2">{problem.question}</p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default MathGame;