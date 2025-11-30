//CONSTANTS & CANVAS SETUP

const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

//GRID CONFIGURATION

const tileSize = 10;
const tileWidth = tileSize;
const tileHeight = tileSize;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

//GAME STATE

let snake = [
  {
    x: Math.floor(tileCountX / 2),
    y: Math.floor(tileCountY / 2)
  }
];

let speed = 7;

// >>> needed: variables for head position and movement
let headX = snake[0].x;
let headY = snake[0].y;

let xVelocity = 1; // >>> starts moving right
let yVelocity = 0;

let ateFood = false;

// Draw board background + border
function drawBoard() {
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Draw snake segments
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

//GAME LOOP

function gameLoop() {
  changeSnakePosition();

  // >>> Check if snake head is on the food
  if (headX === foodX && headY === foodY) {
    ateFood = true;

    const newFood = getValidFoodPosition();
    foodX = newFood.x;
    foodY = newFood.y;

    console.log("Snake ate the food!");
  } else {
    ateFood = false;
  }

  // >>> build new head segment
  const newHead = { x: headX, y: headY };

  // >>> check self collision BEFORE unshift
  if (checkSelfCollision(newHead)) {
    return gameOver();
  }

  // >>> put new head at front of snake
  snake.unshift(newHead);

  // >>> for now: always remove tail (snake stays size 1)
  if (!ateFood) {
    snake.pop();
  }

  drawBoard();
  drawSnake();
  drawFood();

  setTimeout(gameLoop, 1000 / speed);
}

function changeSnakePosition() {
  // >>> needed: move head according to velocity
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  if (headX >= tileCountX) headX = 0;
  if (headX < 0) headX = tileCountX - 1;

  if (headY >= tileCountY) headY = 0;
  if (headY < 0) headY = tileCountY - 1;
}

function checkSelfCollision(newHead) {
  // if ANY segment of the snake has the same x,y of the head → collision
  return snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
}

function gameOver() {
  alert("Game Over!");
  document.location.reload();
}

//INPUT HANDLING

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // going up → can't go down
  if (event.key === "ArrowUp") {
    if (yVelocity === 1) return; 
    yVelocity = -1;
    xVelocity = 0;
  }

  // going down → can't go up
  if (event.key === "ArrowDown") {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  // going left → can't go right
  if (event.key === "ArrowLeft") {
    if (xVelocity === 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }

  // going right → can't go left
  if (event.key === "ArrowRight") {
    if (xVelocity === -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}


//FOOD 
let foodX = Math.floor(Math.random() * tileCountX);
let foodY = Math.floor(Math.random() * tileCountY);

function drawFood() {
  ctx.fillStyle = PINK_HOT;  
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

function getValidFoodPosition() {
  let newX, newY;

  while (true) {
    newX = Math.floor(Math.random() * tileCountX);
    newY = Math.floor(Math.random() * tileCountY);

    // check if this position overlaps the snake
    const onSnake = snake.some(segment => segment.x === newX && segment.y === newY);

    if (!onSnake) {
      return { x: newX, y: newY };
    }
  }
}

//START GAME

gameLoop();
