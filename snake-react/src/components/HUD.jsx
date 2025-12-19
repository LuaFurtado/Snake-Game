// HUD (Heads-Up Display)
// This component displays the level and game over message.
import { useEffect, useState } from "react";

function HUD({ gameRef }) {
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("Game Over");

  useEffect(() => {
  // reset HUD when a new game instance is created
  setIsGameOver(false);
  setLevel(1);

  const interval = setInterval(() => {
    const game = gameRef?.current;

    if (game) {
      setLevel(game.level);
      setIsGameOver(game.gameOver);
      setGameOverMessage(game.config.gameOverMessage);
    }
  }, 100);

  return () => clearInterval(interval);
}, [gameRef]);

  return (
    <div className="hud">
      {isGameOver ? (
        <div className="hud-game-over">
          <h2>{gameOverMessage}</h2>
          <p>You reached Level {level}</p>

          <button
            className="hud-restart-button"
            onClick={() => gameRef.current.restart()}
          >
            Play Again
          </button>
        </div>
      ) : (
        <p className="hud-level">Level: {level}</p>
      )}
    </div>
  );
}

export default HUD;

