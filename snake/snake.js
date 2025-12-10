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

// Game State
let snake = new Snake(tileCountX, tileCountY);
let food = new Food(tileCountX, tileCountY, snake);
let board = new Board(canvas, ctx);

let speed = 7;
let displaySpeed = 1;

let score = 0;

// Draw Score
function drawScore() {
  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "14px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Draw Speed
function drawSpeed() {
  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "14px Arial";
  ctx.fillText("Speed: " + displaySpeed, 10, 387);
}

// Game Over Handler
function gameOver() {
  alert("Game Over! You lost the session.");
  document.getElementById("restartBtn").style.display = "block";
}

// Game Loop
function gameLoop() {
  snake.updatePosition();

  let ateFood = false;
  if (snake.headX === food.x && snake.headY === food.y) {
    ateFood = true;
    score++;

    if (score % 5 === 0) {
      speed += 3;
      displaySpeed++;
    }

    food.reset();
  }

  if (snake.hasSelfCollision()) return gameOver();

  snake.updateBody(ateFood);

  board.draw();
  snake.draw(ctx, tileWidth, tileHeight);
  food.draw(ctx);
  drawScore();
  drawSpeed();

  setTimeout(gameLoop, 1000 / speed);
}

// Input Handling
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.key === "ArrowUp" && snake.yVelocity !== 1) {
    snake.yVelocity = -1;
    snake.xVelocity = 0;
  }

  if (event.key === "ArrowDown" && snake.yVelocity !== -1) {
    snake.yVelocity = 1;
    snake.xVelocity = 0;
  }

  if (event.key === "ArrowLeft" && snake.xVelocity !== 1) {
    snake.xVelocity = -1;
    snake.yVelocity = 0;
  }

  if (event.key === "ArrowRight" && snake.xVelocity !== -1) {
    snake.xVelocity = 1;
    snake.yVelocity = 0;
  }
}

// Start Game (Initial Board)
document.addEventListener("DOMContentLoaded", () => {
  board.draw();
});

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  gameLoop();
});

// Restart Button
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";

  snake = new Snake(tileCountX, tileCountY);
  food = new Food(tileCountX, tileCountY, snake);
  board = new Board(canvas, ctx);

  score = 0;
  speed = 7;
  displaySpeed = 1;

  board.draw();
  gameLoop();
});
