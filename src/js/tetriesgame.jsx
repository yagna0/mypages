import React, { useState, useEffect } from "react";
import "../css/tetris.css";

const COLS = 10;
const ROWS = 20;
const TETROMINOS = [
  { shape: [[1, 1, 1], [0, 1, 0]], color: "red" }, 
  { shape: [[1, 1], [1, 1]], color: "blue" }, 
  { shape: [[1, 1, 1, 1]], color: "green" }, 
];

const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const getRandomTetrimino = () => TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];

const TetrisGame = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [tetrimino, setTetrimino] = useState(getRandomTetrimino());
  const [position, setPosition] = useState({ x: 4, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => moveTetriminoDown(), 500);
    return () => clearInterval(interval);
  }, [position]);

  const isValidMove = (newPos) => {
    return tetrimino.shape.every((row, y) =>
      row.every((cell, x) => {
        if (!cell) return true;
        const newX = newPos.x + x;
        const newY = newPos.y + y;
        return newY < ROWS && newX >= 0 && newX < COLS && (board[newY]?.[newX] === null);
      })
    );
  };

  const moveTetriminoDown = () => {
    setPosition((prevPos) => {
      const newPos = { x: prevPos.x, y: prevPos.y + 1 };
      return isValidMove(newPos) ? newPos : placeTetrimino();
    });
  };

  const placeTetrimino = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      tetrimino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardX = position.x + x;
            const boardY = position.y + y;
            if (boardY < ROWS && boardX < COLS) {
              newBoard[boardY][boardX] = tetrimino.color;
            }
          }
        });
      });
      return newBoard;
    });

    setTetrimino(getRandomTetrimino());
    setPosition({ x: 4, y: 0 });
  };

  return (
    <div className="game">
      <Board board={board} tetrimino={tetrimino} position={position} />
    </div>
  );
};

const Board = ({ board, tetrimino, position }) => {
  const boardWithTetrimino = board.map((row) => [...row]);

  tetrimino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardX = position.x + x;
        const boardY = position.y + y;
        if (boardY < ROWS && boardX < COLS) {
          boardWithTetrimino[boardY][boardX] = tetrimino.color;
        }
      }
    });
  });

  return (
    <div className="board">
      {boardWithTetrimino.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <div
              key={x}
              className="cell"
              style={{ backgroundColor: cell || "gray" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisGame;
