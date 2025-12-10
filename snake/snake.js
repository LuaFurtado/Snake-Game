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

// Game State
let snake = new Snake(tileCountX, tileCountY);

let speed = 7;
let displaySpeed = 1;

let score = 0;
let scoreHistory = [];

// Draw Board Background + Border
function drawBoard() {
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

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

// Food
let foodX;
let foodY;

function drawFood() {
  ctx.fillStyle = PINK_HOT;
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

function getValidFoodPosition() {
  while (true) {
    let newX = Math.floor(Math.random() * tileCountX);
    let newY = Math.floor(Math.random() * tileCountY);

    const onSnake = snake.body.some(
      (segment) => segment.x === newX && segment.y === newY
    );

    if (!onSnake) {
      return { x: newX, y: newY };
    }
  }
}

function resetFood() {
  const newFood = getValidFoodPosition();
  foodX = newFood.x;
  foodY = newFood.y;
}

// Game Over Handler
function gameOver() {
  scoreHistory.push(score);
  if (scoreHistory.length > 3) scoreHistory.shift();

  alert(
    `Game Over!\nYour score: ${score}\nLast scores: ${scoreHistory.join(", ")}`
  );

  document.getElementById("restartBtn").style.display = "block";
}

// Game Loop
function gameLoop() {
  snake.updatePosition();

  let ateFood = false;
  if (snake.headX === foodX && snake.headY === foodY) {
    ateFood = true;
    score++;

    if (score % 5 === 0) {
      speed += 3;
      displaySpeed++;
    }

    resetFood();
  }

  const newHead = { x: snake.headX, y: snake.headY };

  if (snake.hasSelfCollision()) return gameOver();

  snake.body.unshift(newHead);

  if (!ateFood) snake.body.pop();

  drawBoard();
  snake.draw(ctx, tileWidth, tileHeight);
  drawFood();
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
  drawBoard();
  resetFood();
});

// Start Button Click
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

  score = 0;
  speed = 7;
  displaySpeed = 1;

  resetFood();

  drawBoard();
  gameLoop();
});
