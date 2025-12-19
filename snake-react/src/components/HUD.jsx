// HUD (Heads-Up Display)
// This component displays game information to the player,
// such as the current level and the game over message.
// It does not control the game logic, it only reads data from the game.
import { useEffect, useState } from "react";

function HUD({ gameRef, onRestart }) {
  // useState is used to store values that are shown on the screen
  // - level shows the current game level
  // - isGameOver controls whether the game over screen is shown
  // - gameOverMessage displays a custom message when the game ends
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("Game Over");
 
  // useEffect keeps the HUD in sync with the game
  // it checks the game state at regular intervals
  // and updates the HUD when the level changes or when the game is over
  useEffect(() => {
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
            onClick={onRestart}
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
