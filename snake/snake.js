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

// ===== Snake Class =====
class Snake {
  constructor(tileCountX, tileCountY) {
    this.tileCountX = tileCountX;
    this.tileCountY = tileCountY;

    // Snake body starts with 1 segment
    this.body = [
      {
        x: Math.floor(tileCountX / 2),
        y: Math.floor(tileCountY / 2)
      }
    ];

    // Head position
    this.headX = this.body[0].x;
    this.headY = this.body[0].y;

    // Movement velocity
    this.xVelocity = 1;
    this.yVelocity = 0;
  }

  updatePosition() {
    this.headX += this.xVelocity;
    this.headY += this.yVelocity;

    // Wrap horizontally
    if (this.headX >= this.tileCountX) this.headX = 0;
    if (this.headX < 0) this.headX = this.tileCountX - 1;

    // Wrap vertically
    if (this.headY >= this.tileCountY) this.headY = 0;
    if (this.headY < 0) this.headY = this.tileCountY - 1;
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

// ===== Game State =====
let snake = new Snake(tileCountX, tileCountY);

let speed = 7;
let displaySpeed = 1;

let score = 0;
let scoreHistory = [];

// ===== Drawing =====
function drawBoard() {
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "14px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function drawSpeed() {
  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "14px Arial";
  ctx.fillText("Speed: " + displaySpeed, 10, 387);
}

function drawDateTime() {
  const now = new Date();
  const text = now.toLocaleString();

  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "12px Arial";
  ctx.fillText(text, 265, 20);
}

// ===== Food =====
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

// ===== Secret Message (Easter Egg) =====
const secretMessages = [
  ["This easter egg exists solely so I can fulfill all the Techtonica requirements for this milestone. Don't judge me. 😂🐍"],
  ["You found the secret message!"],
  ["Coding magic, activated!"]
];

function drawSecretMessage() {
  if (score > 0 && score % 5 === 0) {
    const selected = secretMessages[score % secretMessages.length][0];

    ctx.fillStyle = PINK_HOT;
    ctx.font = "12px Arial";
    ctx.fillText(selected, 10, 360);

    ctx.fillText(
      `(${selected.length} chars, starts with '${selected[0]}')`,
      10,
      380
    );
  }
}

// ===== Collision =====
function checkSelfCollision(newHead) {
  return snake.body.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );
}

// ===== Game Over =====
function gameOver() {
  scoreHistory.push(score);
  if (scoreHistory.length > 3) scoreHistory.shift();

  alert(
    `Game Over!\nYour score: ${score}\nLast scores: ${scoreHistory.join(", ")}`
  );

  document.getElementById("restartBtn").style.display = "block";
}

// ===== Game Loop =====
function gameLoop() {
  snake.updatePosition();

  // Check if snake ate food
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

  // Build new head segment
  const newHead = { x: snake.headX, y: snake.headY };

  // Self collision
  if (checkSelfCollision(newHead)) return gameOver();

  snake.body.unshift(newHead);

  if (!ateFood) snake.body.pop();

  // Draw everything
  drawBoard();
  snake.draw(ctx, tileWidth, tileHeight);
  drawFood();
  drawScore();
  drawDateTime();
  drawSpeed();
  drawSecretMessage();

  setTimeout(gameLoop, 1000 / speed);
}

// ===== Input Handling =====
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

// ===== Initial Setup =====
document.addEventListener("DOMContentLoaded", () => {
  drawBoard();
  resetFood();
});

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Start
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  gameLoop();
});

// Restart
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
