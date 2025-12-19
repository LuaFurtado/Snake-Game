class Food {
  constructor(tileCountX, tileCountY, snake) {
    this.tileCountX = tileCountX;
    this.tileCountY = tileCountY;
    this.snake = snake;
    this.reset();
  }

  reset() {
    while (true) {
      const newX = Math.floor(Math.random() * this.tileCountX);
      const newY = Math.floor(Math.random() * this.tileCountY);

      const onSnake = this.snake.body.some(
        (segment) => segment.x === newX && segment.y === newY
      );

      if (!onSnake) {
        this.x = newX;
        this.y = newY;
        return;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#ff0099";
    ctx.fillRect(
      this.x * tileSize,
      this.y * tileSize,
      tileSize,
      tileSize
    );
  }
}