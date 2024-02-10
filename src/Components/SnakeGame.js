import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const ROWS = 20;
const COLS = 20;
const INITIAL_SPEED = 200;

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const App = () => {
  const [snake, setSnake] = useState([{ row: 0, col: 0 }]);
  const [food, setFood] = useState(generateRandomPosition());
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameRef = useRef();

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection(Direction.UP);
          break;
        case 'ArrowDown':
          setDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          setDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          setDirection(Direction.RIGHT);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      const moveSnake = () => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case Direction.UP:
            head.row -= 1;
            break;
          case Direction.DOWN:
            head.row += 1;
            break;
          case Direction.LEFT:
            head.col -= 1;
            break;
          case Direction.RIGHT:
            head.col += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (
          head.row < 0 ||
          head.row >= ROWS ||
          head.col < 0 ||
          head.col >= COLS ||
          isCollisionWithItself(newSnake)
        ) {
          setIsGameOver(true);
          return;
        }

        if (head.row === food.row && head.col === food.col) {
          setFood(generateRandomPosition());
          setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10));
        } else {
          newSnake.pop();
        }

        setSnake(newSnake);
      };

      gameRef.current = setInterval(moveSnake, speed);

      return () => {
        clearInterval(gameRef.current);
      };
    }
  }, [snake, direction, food, isGameOver, speed]);

  const restartGame = () => {
    setSnake([{ row: 0, col: 0 }]);
    setFood(generateRandomPosition());
    setDirection(Direction.RIGHT);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
  };

  return (
    <div className="app">
      <h1>{isGameOver ? 'Game Over!' : 'Snake Game'}</h1>
      <div className="game-board">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  snake.some((cell) => cell.row === rowIndex && cell.col === colIndex)
                    ? 'snake'
                    : ''
                } ${food.row === rowIndex && food.col === colIndex ? 'food' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

const generateRandomPosition = () => ({
  row: Math.floor(Math.random() * ROWS),
  col: Math.floor(Math.random() * COLS),
});

const isCollisionWithItself = (snake) => {
  const [head, ...body] = snake;
  return body.some((cell) => cell.row === head.row && cell.col === head.col);
};

export default App;
