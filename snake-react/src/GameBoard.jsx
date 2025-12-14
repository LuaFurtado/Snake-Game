import { useRef, useEffect } from "react";

function GameBoard() {
  const canvasRef = useRef(null);

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
  }, []);

return (
  <div className="game-board-container">
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
    />
  </div>
);
}

export default GameBoard;