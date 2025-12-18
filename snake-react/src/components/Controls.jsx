import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";

function Controls({ gameRef }) {
  const game = gameRef.current;

  // Guard: React may render before the game is ready
  if (!game) return null;

  const snake = game.snake;

  // Antônio Handler 🕹️
  // Ensures only one direction change per game tick,
  // preventing input flooding from rapid button presses
  const tryChangeDirection = (newX, newY, blockX, blockY) => {
    if (!game.canChangeDirection) return;
    if (snake.xVelocity === blockX && snake.yVelocity === blockY) return;

    snake.xVelocity = newX;
    snake.yVelocity = newY;
    game.canChangeDirection = false;
  };

  return (
    <div className="controls">
      <button
        className="control-up"
        onClick={() => tryChangeDirection(0, -1, 0, 1)}
        aria-label="Move up"
      >
        <img src={arrowUp} alt="Arrow up" />
      </button>

      <button
        className="control-left"
        onClick={() => tryChangeDirection(-1, 0, 1, 0)}
        aria-label="Move left"
      >
        <img src={arrowLeft} alt="Arrow left" />
      </button>

      <button
        className="control-right"
        onClick={() => tryChangeDirection(1, 0, -1, 0)}
        aria-label="Move right"
      >
        <img src={arrowRight} alt="Arrow right" />
      </button>

      <button
        className="control-down"
        onClick={() => tryChangeDirection(0, 1, 0, -1)}
        aria-label="Move down"
      >
        <img src={arrowDown} alt="Arrow down" />
      </button>
    </div>
  );
}

export default Controls;
