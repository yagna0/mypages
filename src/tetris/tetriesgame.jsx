import React, { useEffect, useRef } from "react";

const TetrisGame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 500;
        canvas.height = 600;

        // Draw a red block as a test
        ctx.fillStyle = "red";
        ctx.fillRect(100, 100, 50, 50);
    }, []);

    return <canvas ref={canvasRef} id="gameCanvas"></canvas>;
};

export default TetrisGame;
