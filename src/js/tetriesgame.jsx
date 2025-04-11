import React, { useState, useEffect } from "react";

const Tetris = () => {
    const ROWS = 20;
    const COLS = 10;
    const EMPTY_GRID = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    const [grid, setGrid] = useState(EMPTY_GRID());
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [currentBlock, setCurrentBlock] = useState({ x: 4, y: 0 });

    // 🔊 Sound helper
    const playSound = (src) => {
        const audio = new Audio(src);
        audio.play();
    };

    // ▶️ Start game
    const startGame = () => {
        if (!isRunning) {
            setIsRunning(true);
            setGrid(EMPTY_GRID());
            setScore(0);
            setCurrentBlock({ x: 4, y: 0 });
            playSound("/sounds/start.wav");

            const id = setInterval(() => {
                movePieceDown();
            }, 500);
            setIntervalId(id);
        }
    };

    // ⏹️ Stop game
    const stopGame = () => {
        setIsRunning(false);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // ⬇️ Move block down
    const movePieceDown = () => {
        setCurrentBlock((prev) => {
            const newY = prev.y + 1;

            if (newY >= ROWS || grid[newY][prev.x]) {
                placeBlock(prev);

                // Game over check AFTER placing block
                if (prev.y === 0) {
                    stopGame();
                    playSound("/sounds/game-over.mp3");
                    alert("Game Over!");
                    return prev;
                }

                return { x: 4, y: 0 }; // New block
            }

            playSound("/sounds/move.ogg");
            return { ...prev, y: newY };
        });

        setScore((prev) => prev + 10);
    };

    // ⬅️➡️ Move block left/right
    const movePiece = (direction) => {
        setCurrentBlock((prev) => {
            const newX = prev.x + direction;
            if (newX >= 0 && newX < COLS && !grid[prev.y][newX]) {
                playSound("/sounds/move.ogg");
                return { ...prev, x: newX };
            }
            return prev;
        });
    };

    // ⬛ Place block and clear lines
    const placeBlock = (block) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) => [...row]);
            newGrid[block.y][block.x] = 1;

            const clearedGrid = clearLines(newGrid);
            return clearedGrid;
        });
    };

    // 🧼 Clear full lines
    const clearLines = (grid) => {
        const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
        const linesCleared = ROWS - newGrid.length;

        if (linesCleared > 0) {
            const emptyRows = Array.from({ length: linesCleared }, () => Array(COLS).fill(0));
            setScore((prev) => prev + linesCleared * 100);
            playSound("/sounds/line-clear.wav");
            return [...emptyRows, ...newGrid];
        }

        return grid;
    };

    // ⌨️ Keyboard input
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

    // 🧼 Cleanup interval
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
                        const isCurrentBlock =
                            rowIndex === currentBlock.y && cellIndex === currentBlock.x;
                        return (
                            <div
                                key={`${rowIndex}-${cellIndex}`}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: isCurrentBlock
                                        ? "red"
                                        : cell
                                        ? "blue"
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
                <button onClick={() => movePiece(-1)} style={controlButton}>←</button>
                <button onClick={() => movePieceDown()} style={controlButton}>↓</button>
                <button onClick={() => movePiece(1)} style={controlButton}>→</button>
            </div>
        </div>
    );
};

// Button Styles
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
