import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";

function Controls({ gameRef }) {
  const game = gameRef.current;

  if (!game) return null; // <- ESSENCIAL

  const snake = game.snake;

  return (
    <div>
      <button onClick={() => {
        if (snake.yVelocity !== 1) {
          snake.yVelocity = -1;
          snake.xVelocity = 0;
        }
      }}>
        Up
      </button>

      <button onClick={() => {
        if (snake.yVelocity !== -1) {
          snake.yVelocity = 1;
          snake.xVelocity = 0;
        }
      }}>
        Down
      </button>

      <button onClick={() => {
        if (snake.xVelocity !== 1) {
          snake.xVelocity = -1;
          snake.yVelocity = 0;
        }
      }}>
        Left
      </button>

      <button onClick={() => {
        if (snake.xVelocity !== -1) {
          snake.xVelocity = 1;
          snake.yVelocity = 0;
        }
      }}>
        Right
      </button>
    </div>
  );
}

export default Controls;
