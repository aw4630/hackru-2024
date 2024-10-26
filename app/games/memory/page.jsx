"use client";
import React, { useState, useEffect } from 'react';

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];

    const shuffledCards = [...uploadedImages, ...uploadedImages]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ img, id: index, flipped: false }));

    setCards(shuffledCards);
  }, []);

  const handleSelect = (index) => {
    if (disabled || cards[index].flipped) return;

    const newSelected = [...selected, index];
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, flipped: true } : card
    );

    setCards(updatedCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setDisabled(true);
      checkMatch(newSelected);
    }
  };

  const checkMatch = ([firstIndex, secondIndex]) => {
    if (cards[firstIndex].img === cards[secondIndex].img) {
      setMatched([...matched, firstIndex, secondIndex]);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, flipped: false } : card
          )
        );
      }, 1000);
    }
    setSelected([]);
    setDisabled(false);
  };

  return (
    <div className="memory-game">
      {cards.map((card, index) => (
        <div key={index} className={`card ${card.flipped ? 'flipped' : ''}`} onClick={() => handleSelect(index)}>
          <img
            src={card.flipped || matched.includes(index) ? card.img : '/cliparts/placeholder.png'}
            alt="memory card"
          />
        </div>
      ))}
    </div>
  );
}

export default MemoryGame;
