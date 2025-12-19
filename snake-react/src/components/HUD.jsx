// HUD (Heads-Up Display)
// This component displays the level and game over message.
import { useEffect, useState } from "react";

function HUD({ gameRef }) {
  // Level shown in the HUD
  const [level, setLevel] = useState(1);

  // Game over state (controls what the HUD displays)
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const game = gameRef?.current;

      if (game) {
        setLevel(game.level);
        setIsGameOver(game.gameOver);
      }
    }, 100); // checks the game state 10 times per second

    // Cleanup: stop the interval when the HUD is removed from the screen
    return () => clearInterval(interval);
  }, [gameRef]);

  return (
  <div className="hud">
    {isGameOver ? (
      <div className="hud-game-over">
        <h2>Game Over</h2>
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
