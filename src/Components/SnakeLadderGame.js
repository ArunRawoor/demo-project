import React, { useState, useEffect } from 'react';
import './SnakeLadderGame.css';

const SnakeLadderGame = () => {
  const [position, setPosition] = useState(1);
  const [diceValue, setDiceValue] = useState(1);

  useEffect(() => {
    const rollDice = () => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(diceRoll);
    };

    document.addEventListener('keydown', rollDice);

    return () => {
      document.removeEventListener('keydown', rollDice);
    };
  }, []);

  const handleMove = () => {
    const newPosition = position + diceValue;

    if (newPosition <= 100) {
      setPosition(newPosition);

      // Ladder
      if (newPosition === 2) setPosition(23);
      if (newPosition === 4) setPosition(12);
      if (newPosition === 9) setPosition(31);
      if (newPosition === 16) setPosition(47);
      if (newPosition === 21) setPosition(53);
      if (newPosition === 28) setPosition(64);
      if (newPosition === 36) setPosition(86);

      // Snake
      if (newPosition === 51) setPosition(11);
      if (newPosition === 62) setPosition(19);
      if (newPosition === 63) setPosition(60);
      if (newPosition === 71) setPosition(21);
      if (newPosition === 87) setPosition(24);
      if (newPosition === 93) setPosition(73);
      if (newPosition === 95) setPosition(75);
      if (newPosition === 98) setPosition(78);
    }
  };

  const restartGame = () => {
    setPosition(1);
    setDiceValue(1);
  };

  return (
    <div className="game-container">
      <h1>Snake and Ladder Game</h1>
      <div className="board">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: 10 }).map((_, colIndex) => {
              const cellNumber = rowIndex * 10 + colIndex + 1;
              const isSnakeOrLadder =
                (cellNumber >= 2 && cellNumber <= 9) ||
                (cellNumber >= 12 && cellNumber <= 21) ||
                (cellNumber >= 23 && cellNumber <= 36) ||
                (cellNumber >= 47 && cellNumber <= 51) ||
                (cellNumber >= 53 && cellNumber <= 62) ||
                (cellNumber >= 64 && cellNumber <= 71) ||
                (cellNumber >= 73 && cellNumber <= 87) ||
                (cellNumber >= 86 && cellNumber <= 98);

              return (
                <div
                  key={colIndex}
                  className={`cell ${position === cellNumber ? 'player' : ''} ${
                    isSnakeOrLadder ? 'snake-ladder' : ''
                  }`}
                >
                  {isSnakeOrLadder && <div className="marker">{cellNumber}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="controls">
        <p>Current Position: {position}</p>
        <p>Dice Value: {diceValue}</p>
        <button onClick={handleMove}>Roll Dice</button>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
};

export default SnakeLadderGame;
