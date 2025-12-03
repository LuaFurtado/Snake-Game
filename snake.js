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

// Game State
let snake = [
  {
    x: Math.floor(tileCountX / 2),
    y: Math.floor(tileCountY / 2)
  }
];

let speed = 7;
let displaySpeed = 1;

// Movement Variables
let headX = snake[0].x;
let headY = snake[0].y;

let xVelocity = 1;
let yVelocity = 0;

let ateFood = false;

// Score
let score = 0;

// Draw Board Background + Border
function drawBoard() {
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Draw Snake Segments
function drawSnake() {
  ctx.fillStyle = GREEN_WICKED;
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileWidth,
      segment.y * tileHeight,
      tileWidth,
      tileHeight
    );
  });
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

// Draw Date & Time
function drawDateTime() {
  const now = new Date();
  const text = now.toLocaleString();

  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "12px Arial";
  ctx.fillText(text, 265, 20);
}

// Game Loop
function gameLoop() {
  changeSnakePosition();

  // Check If Snake Head Is On the Food
  if (headX === foodX && headY === foodY) {
    ateFood = true;
    score++;

    if (score % 5 === 0) {
      speed += 3;
      displaySpeed++;
    }

    const newFood = getValidFoodPosition();
    foodX = newFood.x;
    foodY = newFood.y;
  } else {
    ateFood = false;
  }

  // Build New Head Segment
  const newHead = { x: headX, y: headY };

  // Check Self Collision Before Adding Head
  if (checkSelfCollision(newHead)) {
    return gameOver();
  }

  // Add New Head to Front of Snake
  snake.unshift(newHead);

  // Remove Tail Only If No Food
  if (!ateFood) {
    snake.pop();
  }

  drawBoard();
  drawSnake();
  drawFood();
  drawScore();
  drawDateTime();
  drawSpeed();

  console.log("speed:", speed);

  setTimeout(gameLoop, 1000 / speed);
}

// Update Snake Position
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  if (headX >= tileCountX) headX = 0;
  if (headX < 0) headX = tileCountX - 1;

  if (headY >= tileCountY) headY = 0;
  if (headY < 0) headY = tileCountY - 1;
}

// Check Self Collision
function checkSelfCollision(newHead) {
  return snake.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );
}

// Game Over Handler
function gameOver() {
  alert("Game Over!");
  document.getElementById("restartBtn").style.display = "block";
}

// Input Handling
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // Going up → can't go down
  if (event.key === "ArrowUp") {
    if (yVelocity === 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  // Going down → can't go up
  if (event.key === "ArrowDown") {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  // Going left → can't go right
  if (event.key === "ArrowLeft") {
    if (xVelocity === 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }

  // Going right → can't go left
  if (event.key === "ArrowRight") {
    if (xVelocity === -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}

// Food
let foodX = Math.floor(Math.random() * tileCountX);
let foodY = Math.floor(Math.random() * tileCountY);

// Draw Food
function drawFood() {
  ctx.fillStyle = PINK_HOT;
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

// Get Valid Food Position
function getValidFoodPosition() {
  let newX, newY;

  while (true) {
    newX = Math.floor(Math.random() * tileCountX);
    newY = Math.floor(Math.random() * tileCountY);

    const onSnake = snake.some(
      (segment) => segment.x === newX && segment.y === newY
    );

    if (!onSnake) {
      return { x: newX, y: newY };
    }
  }
}

// Start Game (Initial Board)
document.addEventListener("DOMContentLoaded", () => {
  drawBoard();
});

const startBtn = document.getElementById("startBtn");

// Start Button Click
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.display = "none";
  gameLoop();
});

// Restart Button
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";

  // Reset Game State
  snake = [
    {
      x: Math.floor(tileCountX / 2),
      y: Math.floor(tileCountY / 2)
    }
  ];

  headX = snake[0].x;
  headY = snake[0].y;

  xVelocity = 1;
  yVelocity = 0;

  score = 0;
  speed = 7;

  // Generate New Food
  const newFood = getValidFoodPosition();
  foodX = newFood.x;
  foodY = newFood.y;

  drawBoard();

  gameLoop();
});
