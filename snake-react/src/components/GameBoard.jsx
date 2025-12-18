import "./App.css";
import { useRef, useEffect } from "react";
import Game from "../game/Game";

function GameBoard() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // background
    ctx.fillStyle = "#fce4ec";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // border
    ctx.strokeStyle = "#ff0099";
    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // connect with no logic just yet
    gameRef.current = new Game({
      canvas,
      ctx,
      onScoreChange: () => {},
      onSpeedChange: () => {},
      onGameOver: () => {},
    });
  }, []);

  return (
    <div className="game-board-container">
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
}

export default GameBoard;
