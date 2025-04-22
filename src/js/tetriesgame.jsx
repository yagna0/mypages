import React, { useState, useEffect } from "react";

const ROWS = 20;
const COLS = 10;
const EMPTY_GRID = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// Tetrominoes definition
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "cyan" },
  O: { shape: [[1, 1], [1, 1]], color: "yellow" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "purple" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "green" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "red" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "blue" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "orange" },
};

// Pick random tetromino
const getRandomBlock = () => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const tetro = TETROMINOES[randomKey];
  return { shape: tetro.shape, color: tetro.color, x: 3, y: 0 };
};

const Tetris = () => {
  const [grid, setGrid] = useState(EMPTY_GRID());
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(getRandomBlock());

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
      setGrid(EMPTY_GRID());
      setScore(0);
      setCurrentBlock(getRandomBlock());
      playSound("/sounds/start.wav");

      const id = setInterval(() => {
        movePieceDown();
      }, 500);
      setIntervalId(id);
    }
  };

  const stopGame = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const movePieceDown = () => {
    setCurrentBlock((prev) => {
      const { shape, x, y } = prev;
      const newY = y + 1;

      const willCollide = shape.some((row, rY) =>
        row.some((val, rX) => {
          if (val) {
            const gx = x + rX;
            const gy = newY + rY;
            return gy >= ROWS || (gy >= 0 && grid[gy][gx]);
          }
          return false;
        })
      );

      if (willCollide) {
        placeBlock(prev);
        if (y === 0) {
          stopGame();
          playSound("/sounds/game-over.mp3");
          alert("Game Over!");
          return prev;
        }
        return getRandomBlock();
      }

      playSound("/sounds/move.ogg");
      return { ...prev, y: newY };
    });

    setScore((prev) => prev + 10);
  };

  const movePiece = (direction) => {
    setCurrentBlock((prev) => {
      const { shape, x, y } = prev;
      const newX = x + direction;

      const canMove = shape.every((row, rY) =>
        row.every((val, rX) => {
          if (!val) return true;
          const gx = newX + rX;
          const gy = y + rY;
          return gx >= 0 && gx < COLS && (!grid[gy] || !grid[gy][gx]);
        })
      );

      if (canMove) {
        playSound("/sounds/move.ogg");
        return { ...prev, x: newX };
      }
      return prev;
    });
  };

  const placeBlock = (block) => {
    const { shape, x, y, color } = block;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      shape.forEach((row, rY) => {
        row.forEach((val, rX) => {
          if (val) {
            const gx = x + rX;
            const gy = y + rY;
            if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
              newGrid[gy][gx] = color;
            }
          }
        });
      });

      return clearLines(newGrid);
    });
  };

  const clearLines = (grid) => {
    const newGrid = grid.filter((row) => row.some((cell) => !cell));
    const linesCleared = ROWS - newGrid.length;

    if (linesCleared > 0) {
      const emptyRows = Array.from({ length: linesCleared }, () =>
        Array(COLS).fill(0)
      );
      setScore((prev) => prev + linesCleared * 100);
      playSound("/sounds/line-clear.wav");
      return [...emptyRows, ...newGrid];
    }

    return grid;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isRunning) return;
      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowDown") movePieceDown();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning, grid]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Tetris</h1>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gap: "1px",
          justifyContent: "center",
          background: "black",
          padding: "5px",
          margin: "0 auto",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            let isCurrentBlock = false;
            let blockColor = "";

            const { shape, x, y, color } = currentBlock;
            shape.forEach((r, rY) =>
              r.forEach((val, rX) => {
                if (val) {
                  const gx = x + rX;
                  const gy = y + rY;
                  if (gx === cellIndex && gy === rowIndex) {
                    isCurrentBlock = true;
                    blockColor = color;
                  }
                }
              })
            );

            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: isCurrentBlock
                    ? blockColor
                    : typeof cell === "string"
                    ? cell
                    : "white",
                  border: "1px solid black",
                }}
              ></div>
            );
          })
        )}
      </div>

      <h2>Score: {score}</h2>

      {/* Controls */}
      <div style={{ margin: "10px" }}>
        <button onClick={startGame} disabled={isRunning} style={buttonStyle}>
          Start
        </button>
        <button onClick={stopGame} disabled={!isRunning} style={buttonStyle}>
          Stop
        </button>
      </div>

      {/* On-screen Move Controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => movePiece(-1)} style={controlButton}>
          ←
        </button>
        <button onClick={() => movePieceDown()} style={controlButton}>
          ↓
        </button>
        <button onClick={() => movePiece(1)} style={controlButton}>
          →
        </button>
      </div>
    </div>
  );
};

// Button styles
const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
};

const controlButton = {
  margin: "5px",
  padding: "10px 15px",
  fontSize: "20px",
  cursor: "pointer",
};

export default Tetris;
