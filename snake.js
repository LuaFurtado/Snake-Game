
//CONSTANTS & CANVAS SETUP

const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

//GRID CONFIGURATION

const tileSize = 10;
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

//DRAW FUNCTIONS


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
  ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);

  });
}

//GAME LOOP

function gameLoop() {
  drawBoard();
  drawSnake();

  // Debug to observe updates in the console
  console.log("Redrawing the game at speed:", speed);

  setTimeout(gameLoop, 1000 / speed);
}


//INPUT HANDLING

document.body.addEventListener("keydown", keyDown);

// Placeholder function so your listener doesn't break
function keyDown(event) {
  console.log("Key pressed:", event.key);
}


//START GAME

gameLoop();
