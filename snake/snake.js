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

    this.body = [ 
      {
        x: Math.floor(tileCountX / 2),
        y: Math.floor(tileCountY / 2)
      }
    ];
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

// Movement (head position + velocity)
let headX = snake.body[0].x;
let headY = snake.body[0].y;

let xVelocity = 1;
let yVelocity = 0;

// Score
let score = 0;
let scoreHistory = [];

// Food
let foodX;
let foodY;

// ===== Draw Functions =====
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

function drawFood() {
  ctx.fillStyle = PINK_HOT;
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

// ===== Secret Message / Easter Egg =====
const secretMessages = [
  ["This easter egg exists solely so I can fulfill all the Techtonica requirements for this milestone. Don't judge me. 😂🐍"],
  ["You found the secret message!"],
  ["Coding magic, activated!"]
];

let messageHistory = [];

function drawSecretMessage() {
  if (score > 0 && score % 5 === 0) {
    const selected = secretMessages[score % secretMessages.length][0];

    const msgLength = selected.length;
    const firstChar = selected[0];

    ctx.fillStyle = PINK_HOT;
    ctx.font = "12px Arial";
    ctx.fillText(selected, 10, 360);

    ctx.fillText(
      `(${msgLength} chars, starts with '${firstChar}')`,
      10,
      380
    );
  }
}

// ===== Food Helpers =====
function getValidFoodPosition() {
  let newX, newY;

  while (true) {
    newX = Math.floor(Math.random() * tileCountX);
    newY = Math.floor(Math.random() * tileCountY);

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

// ===== Movement & Collision =====
function updateSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  // Wrap horizontally
  if (headX >= tileCountX) headX = 0;
  if (headX < 0) headX = tileCountX - 1;

  // Wrap vertically
  if (headY >= tileCountY) headY = 0;
  if (headY < 0) headY = tileCountY - 1;
}

function checkSelfCollision(newHead) {
  return snake.body.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );
}

// ===== Game Over =====
function gameOver() {
  scoreHistory.push(score);

  if (scoreHistory.length > 3) {
    scoreHistory.shift();
  }

  alert(
    `Game Over!\n` +
    `Your score: ${score}\n` +
    `Last scores: ${scoreHistory.join(", ")}`
  );

  document.getElementById("restartBtn").style.display = "block";
}

// ===== Main Game Loop =====
function gameLoop() {
  updateSnakePosition();

  // Check food collision
  let ateFood = false;
  if (headX === foodX && headY === foodY) {
    ateFood = true;
    score++;

    if (score % 5 === 0) {
      speed += 3;
      displaySpeed++;
    }

    resetFood();
  }

  const newHead = { x: headX, y: headY };

  // Self collision
  if (checkSelfCollision(newHead)) {
    return gameOver();
  }

  // Add head
  snake.body.unshift(newHead);

  // Remove tail if no food
  if (!ateFood) {
    snake.body.pop();
  }

  // Draw
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
  if (event.key === "ArrowUp") {
    if (yVelocity === 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  if (event.key === "ArrowDown") {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  if (event.key === "ArrowLeft") {
    if (xVelocity === 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }

  if (event.key === "ArrowRight") {
    if (xVelocity === -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}

// ===== Initial Setup =====
document.addEventListener("DOMContentLoaded", () => {
  drawBoard();
  resetFood();
});

// Buttons
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  gameLoop();
});

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";

  // Reset snake
  snake = new Snake(tileCountX, tileCountY);
  headX = snake.body[0].x;
  headY = snake.body[0].y;

  // Reset movement
  xVelocity = 1;
  yVelocity = 0;

  // Reset score & speed
  score = 0;
  speed = 7;
  displaySpeed = 1;

  // Reset food
  resetFood();

  drawBoard();
  gameLoop();
});
