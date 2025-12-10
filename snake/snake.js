// Constants & Canvas Setup
const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// Grid Configuration
const tileSize = 10;
const tileWidth = tileSize;
const tileHeight = tileSize;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

// Snake
class Snake {
  constructor(tileCountX, tileCountY) {
    this.tileCountX = tileCountX;
    this.tileCountY = tileCountY;

    this.body = [
      {
        x: Math.floor(tileCountX / 2),
        y: Math.floor(tileCountY / 2)
      }
    ];

    this.headX = this.body[0].x;
    this.headY = this.body[0].y;

    this.xVelocity = 1;
    this.yVelocity = 0;
  }

  updatePosition() {
    this.headX += this.xVelocity;
    this.headY += this.yVelocity;

    if (this.headX >= this.tileCountX) this.headX = 0;
    if (this.headX < 0) this.headX = this.tileCountX - 1;
    if (this.headY >= this.tileCountY) this.headY = 0;
    if (this.headY < 0) this.headY = this.tileCountY - 1;
  }

  hasSelfCollision() {
    return this.body.some((segment, index) => {
      return index !== 0 &&
             segment.x === this.headX &&
             segment.y === this.headY;
    });
  }

  updateBody(ateFood) {
    const newHead = { x: this.headX, y: this.headY };
    this.body.unshift(newHead);

    if (!ateFood) {
      this.body.pop();
    }
  }

  draw(ctx, tileWidth, tileHeight) {
    ctx.fillStyle = GREEN_WICKED;
    this.body.forEach((segment) => {
      ctx.fillRect(
        segment.x * tileWidth,
        segment.y * tileHeight,
        tileWidth,
        tileHeight
      );
    });
  }
}

// Food
class Food {
  constructor(tileCountX, tileCountY, snake) {
    this.tileCountX = tileCountX;
    this.tileCountY = tileCountY;
    this.snake = snake;

    this.reset();
  }

  reset() {
    while (true) {
      let newX = Math.floor(Math.random() * this.tileCountX);
      let newY = Math.floor(Math.random() * this.tileCountY);

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
    ctx.fillStyle = PINK_HOT;
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}

// Board
class Board {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = PINK_LIGHT;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = PINK_HOT;
    this.ctx.lineWidth = 6;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Game
class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.snake = new Snake(tileCountX, tileCountY);
    this.food = new Food(tileCountX, tileCountY, this.snake);
    this.board = new Board(canvas, ctx);

    this.speed = 7;
    this.displaySpeed = 1;
    this.score = 0;

    this.running = false;
  }

  start() {
    this.running = true;
    this.loop();
  }

  loop() {
    if (!this.running) return;

    this.update();
    this.draw();

    setTimeout(() => this.loop(), 1000 / this.speed);
  }

  update() {
    this.snake.updatePosition();

    let ateFood = false;
    if (this.snake.headX === this.food.x && this.snake.headY === this.food.y) {
      ateFood = true;
      this.score++;

      if (this.score % 5 === 0) {
        this.speed += 3;
        this.displaySpeed++;
      }

      this.food.reset();
    }

    if (this.snake.hasSelfCollision()) {
      this.gameOver();
      return;
    }

    this.snake.updateBody(ateFood);
  }

  draw() {
    this.board.draw();
    this.snake.draw(ctx, tileWidth, tileHeight);
    this.food.draw(ctx);
    this.drawScore();
    this.drawSpeed();
  }

  drawScore() {
    ctx.fillStyle = GREEN_WICKED;
    ctx.font = "14px Arial";
    ctx.fillText("Score: " + this.score, 10, 20);
  }

  drawSpeed() {
    ctx.fillStyle = GREEN_WICKED;
    ctx.font = "14px Arial";
    ctx.fillText("Speed: " + this.displaySpeed, 10, 387);
  }

  gameOver() {
    alert("Game Over! You lost the session.");
    document.getElementById("restartBtn").style.display = "block";
    this.running = false;
  }

  restart() {
    this.snake = new Snake(tileCountX, tileCountY);
    this.food = new Food(tileCountX, tileCountY, this.snake);
    this.board = new Board(canvas, ctx);

    this.score = 0;
    this.speed = 7;
    this.displaySpeed = 1;

    this.running = true;
    this.loop();
  }
}

// Create Game
let game = new Game(canvas, ctx);

// Input Handling
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.key === "ArrowUp" && game.snake.yVelocity !== 1) {
    game.snake.yVelocity = -1;
    game.snake.xVelocity = 0;
  }

  if (event.key === "ArrowDown" && game.snake.yVelocity !== -1) {
    game.snake.yVelocity = 1;
    game.snake.xVelocity = 0;
  }

  if (event.key === "ArrowLeft" && game.snake.xVelocity !== 1) {
    game.snake.xVelocity = -1;
    game.snake.yVelocity = 0;
  }

  if (event.key === "ArrowRight" && game.snake.xVelocity !== -1) {
    game.snake.xVelocity = 1;
    game.snake.yVelocity = 0;
  }
}

// Start Game
document.addEventListener("DOMContentLoaded", () => {
  game.board.draw();
});

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  game.start();
});

// Restart Button
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  game.restart();
});
