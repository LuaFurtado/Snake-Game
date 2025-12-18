import { useRef, useEffect } from "react";
import "../App.css";

const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";

function GameBoard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = PINK_LIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = PINK_HOT;
    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="game-board-container">
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
}

export default GameBoard;
