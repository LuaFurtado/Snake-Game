// Constants & Canvas Setup
const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// Grid Configuration
// The game board is divided into square tiles.
// Each tile is tileSize pixels, and the grid dimensions (tileCountX/Y)
// are calculated based on the canvas width and height.
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
  const customDate = new Date(2020, 0, 1); 
  customDate.setTime(Date.now());

  const now = new Date();
  const text = now.toLocaleString();

  ctx.fillStyle = GREEN_WICKED;
  ctx.font = "12px Arial";
  ctx.fillText(text, 265, 20);
}


// Game Loop
function gameLoop() {
  updateSnakePosition();

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
  drawSecretMessage();


  console.log("speed:", speed);

  setTimeout(gameLoop, 1000 / speed);
}

// Update Snake Position
function updateSnakePosition() {
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
// TODO: Replace this temporary alert with a proper Game Over screen.
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

/*TODO – Future Refactor
1. Transform Snake into an object (state + methods).
2. Move head position, velocity, body and movement into Snake object.
3. Move self-collision logic into Snake object.
4. Move unshift/pop logic into Snake object.
5. Remove ateFood variable entirely.
6. Create a Snake.updatePosition() method.
7. Eliminate newHead by using Snake’s internal state.
8. Transform Board into an object with a draw() method.
9. Transform Food into an object (state + draw + valid position).
10. Move foodX/foodY to the main state section or into Food object.
11. Consider using Food.reset() and Snake.reset().
12. Create a Game object to hold score, speed, snake, food.
13. Add Game.reset() for full state reset.
14. Move collision check into Snake.updatePosition().
15. Replace multiple if statements in keyDown() with a switch.
16. Review need for two separate buttons (start/restart).

End of TODO list.*/

// ===== Easter Egg to fulfill missing Techtonica requirements =====
const secretMessages = [
  ["This easter egg exists solely so I can fulfill all the Techtonica requirements for this milestone. Don't judge me. 😂🐍"],
  ["You found the secret message!"],
  ["Coding magic, activated!"]
];

let messageHistory = [];

function drawSecretMessage() {
  if (score > 0 && score % 5 === 0) {

    // Select message from nested array
    // Using score % secretMessages.length to rotate messages instead of loop.
    const selected = secretMessages[score % secretMessages.length][0];

    // String length
    const msgLength = selected.length;

    // First character
    // Apparently I don’t need to split the string to get a letter. JS just lets me do selected[0].

    const firstChar = selected[0];

    // Display selected message
    ctx.fillStyle = PINK_HOT;
    ctx.font = "12px Arial";
    ctx.fillText(selected, 10, 360);

    // Display optional length/index info
    ctx.fillText(
      `(${msgLength} chars, starts with '${firstChar}')`,
      10,
      380
    );
  }
}
