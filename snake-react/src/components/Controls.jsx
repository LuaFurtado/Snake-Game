function Controls({ gameRef }) {
  const game = gameRef.current;

  if (!game) return null; // ESSENCIAL

  const snake = game.snake;

  return (
    <div>
      <button onClick={() => {
        if (snake.yVelocity !== 1) {
          snake.yVelocity = -1;
          snake.xVelocity = 0;
        }
      }}>
        ↑
      </button>

      <button onClick={() => {
        if (snake.yVelocity !== -1) {
          snake.yVelocity = 1;
          snake.xVelocity = 0;
        }
      }}>
        ↓
      </button>

      <button onClick={() => {
        if (snake.xVelocity !== 1) {
          snake.xVelocity = -1;
          snake.yVelocity = 0;
        }
      }}>
        ←
      </button>

      <button onClick={() => {
        if (snake.xVelocity !== -1) {
          snake.xVelocity = 1;
          snake.yVelocity = 0;
        }
      }}>
        →
      </button>
    </div>
  );
}

export default Controls;
