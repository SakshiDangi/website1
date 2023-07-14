import React, { useState, useEffect } from 'react';
import './App.css';

const ROWS = 20;
const COLS = 20;

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const App = () => {
  const [snake, setSnake] = useState([
    { row: 10, col: 10 },
    { row: 10, col: 9 },
  ]);
  const [food, setFood] = useState({ row: 5, col: 5 });
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== Direction.DOWN) {
      setDirection(Direction.UP);
    } else if (key === 'ArrowDown' && direction !== Direction.UP) {
      setDirection(Direction.DOWN);
    } else if (key === 'ArrowLeft' && direction !== Direction.RIGHT) {
      setDirection(Direction.LEFT);
    } else if (key === 'ArrowRight' && direction !== Direction.LEFT) {
      setDirection(Direction.RIGHT);
    }
  };

  const moveSnake = () => {
    if (gameOver) return;

    const head = { ...snake[0] };
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

    if (head.row < 0 || head.row >= ROWS || head.col < 0 || head.col >= COLS) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake.slice(0, -1)];

    if (newSnake.some((segment) => segment.row === head.row && segment.col === head.col)) {
      setGameOver(true);
      return;
    }

    if (head.row === food.row && head.col === food.col) {
      setFood(generateFood());
      newSnake.push(snake[snake.length - 1]);
    }

    setSnake(newSnake);
  };

  const generateFood = () => {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    return { row, col };
  };

  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex="0">
      <h1>Snake Game</h1>
      <div className="game-container">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  snake.some((segment) => segment.row === rowIndex && segment.col === colIndex)
                    ? 'snake'
                    : ''
                } ${
                  food.row === rowIndex && food.col === colIndex ? 'food' : ''
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import Header from './component/Header';
// import Home from './component/Home';


// import "./App.css";
// import "./styles/nav.scss";
// import "./styles/home.scss";

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
