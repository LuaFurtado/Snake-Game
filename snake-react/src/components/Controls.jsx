import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";

function Controls({ gameRef }) {
  const game = gameRef.current;

  if (!game) return null; // ESSENCIAL

  const snake = game.snake;

  return (
    <div>
      <button
        onClick={() => {
          if (snake.yVelocity !== 1) {
            snake.yVelocity = -1;
            snake.xVelocity = 0;
          }
        }}
      >
        <img src={arrowUp} alt="Move up" />
      </button>

      <button
        onClick={() => {
          if (snake.yVelocity !== -1) {
            snake.yVelocity = 1;
            snake.xVelocity = 0;
          }
        }}
      >
        <img src={arrowDown} alt="Move down" />
      </button>

      <button
        onClick={() => {
          if (snake.xVelocity !== 1) {
            snake.xVelocity = -1;
            snake.yVelocity = 0;
          }
        }}
      >
        <img src={arrowLeft} alt="Move left" />
      </button>

      <button
        onClick={() => {
          if (snake.xVelocity !== -1) {
            snake.xVelocity = 1;
            snake.yVelocity = 0;
          }
        }}
      >
        <img src={arrowRight} alt="Move right" />
      </button>
    </div>
  );
}

export default Controls;
